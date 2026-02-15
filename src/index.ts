#!/usr/bin/env node

import { setupHooks } from "./setup-hooks.js";

// Handle --setup-hooks flag before importing MCP dependencies
if (process.argv.includes("--setup-hooks")) {
  setupHooks();
  process.exit(0);
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Memory IN tools
import { saveProgressSchema, saveProgressHandler } from "./tools/save-progress.js";
import { markCompleteSchema, markCompleteHandler } from "./tools/mark-complete.js";
import { logBlockerSchema, logBlockerHandler } from "./tools/log-blocker.js";
import { saveSessionSchema, saveSessionHandler } from "./tools/save-session.js";
import { logProgressSchema, logProgressHandler } from "./tools/log-progress.js";

// Memory OUT tools
import { recallWorkSchema, recallWorkHandler } from "./tools/recall-work.js";
import { getLastSessionSchema, getLastSessionHandler } from "./tools/get-last-session.js";
import { getHistorySchema, getHistoryHandler } from "./tools/get-history.js";
import { getStatusSchema, getStatusHandler } from "./tools/get-status.js";

const server = new McpServer({
  name: "planbrew",
  version: "0.1.0",
});

// --- Memory IN (save work context) ---

server.tool(
  "save_progress",
  "Save what you worked on so it can be recalled later",
  saveProgressSchema.shape,
  saveProgressHandler
);

server.tool(
  "mark_complete",
  "Mark a task as done and record what was accomplished",
  markCompleteSchema.shape,
  markCompleteHandler
);

server.tool(
  "log_blocker",
  "Record a blocker or impediment that is slowing down work",
  logBlockerSchema.shape,
  logBlockerHandler
);

server.tool(
  "log_progress",
  "Quick one-liner to log what you did - just type a message like 'fixed login bug' or 'worked on auth for 2 hours'",
  logProgressSchema.shape,
  logProgressHandler
);

server.tool(
  "save_session",
  "Save a full session summary including files changed and blockers",
  saveSessionSchema.shape,
  saveSessionHandler
);

// --- Memory OUT (recall past work) ---

server.tool(
  "recall_work",
  "Search past work history to remember what was done before",
  recallWorkSchema.shape,
  recallWorkHandler
);

server.tool(
  "get_last_session",
  "Get the most recent session summary to pick up where you left off",
  getLastSessionSchema.shape,
  getLastSessionHandler
);

server.tool(
  "get_history",
  "Browse the activity feed to see what has been happening on the project",
  getHistorySchema.shape,
  getHistoryHandler
);

server.tool(
  "get_status",
  "Get the current project status including health, progress, and blockers",
  getStatusSchema.shape,
  getStatusHandler
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[planbrew-mcp] Server started on STDIO");
}

main().catch((err) => {
  console.error("[planbrew-mcp] Fatal error:", err);
  process.exit(1);
});
