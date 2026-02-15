import { writeFileSync, mkdirSync, readFileSync, existsSync, chmodSync } from "fs";
import { join } from "path";
import { config } from "./config.js";

const HOOK_SCRIPT = `#!/usr/bin/env bash
set -euo pipefail
DEDUPE_FILE="/tmp/planbrew-hook-lastlog"
DEDUPE_WINDOW=60
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys,json
try:
 d=json.load(sys.stdin)
 print(d.get('tool_input',{}).get('file_path','') or d.get('filePath',''))
except: print('')
" 2>/dev/null || echo "")
[ -z "$FILE_PATH" ] && exit 0
FILENAME=$(basename "$FILE_PATH")
NOW=$(date +%s)
if [ -f "$DEDUPE_FILE" ]; then
 LAST=$(grep "^$FILE_PATH|" "$DEDUPE_FILE" 2>/dev/null | tail -1 || echo "")
 if [ -n "$LAST" ]; then
  DIFF=$((NOW - $(echo "$LAST" | cut -d'|' -f2)))
  [ "$DIFF" -lt "$DEDUPE_WINDOW" ] && exit 0
 fi
 awk -F'|' -v n="$NOW" -v w="$DEDUPE_WINDOW" '(n-$2)<w' "$DEDUPE_FILE" > "$DEDUPE_FILE.tmp" 2>/dev/null; mv "$DEDUPE_FILE.tmp" "$DEDUPE_FILE" 2>/dev/null || true
fi
echo "$FILE_PATH|$NOW" >> "$DEDUPE_FILE"
curl -s -X POST "ENDPOINT_PLACEHOLDER" -H "Content-Type: application/json" -H "X-API-KEY: APIKEY_PLACEHOLDER" -d "{\\"projectId\\":\\"PROJECTID_PLACEHOLDER\\",\\"message\\":\\"[auto] edited $FILENAME\\"}" >/dev/null 2>&1 &
exit 0`;

export function setupHooks() {
  const cwd = process.cwd();

  if (!config.apiKey || !config.projectId) {
    console.error("Error: PLANBREW_API_KEY and PLANBREW_PROJECT_ID must be set.");
    console.error("These are passed via the claude mcp add command's -e flags.");
    process.exit(1);
  }

  const endpoint = `${config.apiUrl}/progress/log`;
  const script = HOOK_SCRIPT
    .replace("ENDPOINT_PLACEHOLDER", endpoint)
    .replace("APIKEY_PLACEHOLDER", config.apiKey)
    .replace("PROJECTID_PLACEHOLDER", config.projectId);

  // 1. Create hook script
  const hooksDir = join(cwd, ".claude", "hooks");
  mkdirSync(hooksDir, { recursive: true });
  const hookPath = join(hooksDir, "log-progress.sh");
  writeFileSync(hookPath, script, "utf-8");
  chmodSync(hookPath, 0o755);
  console.log(`Created ${hookPath}`);

  // 2. Update .claude/settings.json
  const settingsPath = join(cwd, ".claude", "settings.json");
  let settings: Record<string, unknown> = {};
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf-8"));
    } catch {
      // start fresh if corrupted
    }
  }

  if (!settings.hooks) settings.hooks = {};
  const hooks = settings.hooks as Record<string, unknown>;
  hooks["PostToolUse"] = [
    {
      matcher: "Write|Edit",
      hooks: [
        {
          type: "command",
          command: ".claude/hooks/log-progress.sh",
          async: true,
        },
      ],
    },
  ];

  writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
  console.log(`Updated ${settingsPath}`);

  // 3. Create .cursor/hooks.json
  const cursorDir = join(cwd, ".cursor");
  mkdirSync(cursorDir, { recursive: true });
  const cursorHooksPath = join(cursorDir, "hooks.json");
  writeFileSync(
    cursorHooksPath,
    JSON.stringify(
      {
        afterFileEdit: {
          command: "bash",
          args: [".claude/hooks/log-progress.sh"],
          input: "stdin",
        },
      },
      null,
      2
    ),
    "utf-8"
  );
  console.log(`Created ${cursorHooksPath}`);

  console.log("\nAuto-logging hooks installed! Every file edit will be logged to PlanBrew.");
}
