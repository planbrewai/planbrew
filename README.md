# planbrew-mcp

Project memory for AI coding agents. Save what you did, recall what you did — across sessions.

[PlanBrew](https://www.planbrew.ai) gives your AI assistant persistent memory so it can pick up where you left off.

## Setup

1. Sign up at [planbrew.ai](https://www.planbrew.ai) and create a project
2. Copy your API key and project ID from the setup page
3. Add to your MCP config:

### Claude Code (`.mcp.json`)

```json
{
  "mcpServers": {
    "planbrew": {
      "command": "npx",
      "args": ["-y", "planbrew-mcp"],
      "env": {
        "PLANBREW_API_KEY": "your-api-key",
        "PLANBREW_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

Same JSON as above.

### Codex (`.codex/config.toml`)

```toml
[mcp_servers.planbrew]
command = "npx"
args = ["-y", "planbrew-mcp"]

[mcp_servers.planbrew.env]
PLANBREW_API_KEY = "your-api-key"
PLANBREW_PROJECT_ID = "your-project-id"
```

## Tools

### Memory IN — save context as you work

| Tool | Description |
|------|-------------|
| `save_progress` | Save what you worked on |
| `mark_complete` | Mark a task as done |
| `log_blocker` | Record a blocker |
| `save_session` | End-of-session summary |

### Memory OUT — recall past work

| Tool | Description |
|------|-------------|
| `recall_work` | Search past work by keyword or date |
| `get_last_session` | What happened last session |
| `get_history` | Activity feed for any time period |
| `get_status` | Project overview and health |

## Environment Variables

| Variable | Required | Default |
|----------|----------|---------|
| `PLANBREW_API_KEY` | Yes | — |
| `PLANBREW_PROJECT_ID` | Yes | — |
| `PLANBREW_API_URL` | No | `https://api.planbrew.ai/api/v1` |

## License

MIT
