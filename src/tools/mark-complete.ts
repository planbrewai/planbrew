import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";

export const markCompleteSchema = z.object({
  taskId: z.string().describe("Task id or identifier to mark as complete"),
  summary: z.string().describe("Summary of what was accomplished"),
  filesChanged: z.array(z.string()).optional().describe("List of files that were changed"),
});

export async function markCompleteHandler(args: z.infer<typeof markCompleteSchema>) {
  const projectId = config.projectId;
  if (!projectId) {
    return { content: [{ type: "text" as const, text: "Error: PLANBREW_PROJECT_ID not set." }] };
  }

  const res = await apiRequest("POST", "/progress/complete", {
    projectId,
    taskId: args.taskId,
    summary: args.summary,
    filesChanged: args.filesChanged || [],
  });

  if (!res.success) {
    return { content: [{ type: "text" as const, text: `Error marking task complete: ${res.message}` }] };
  }

  return { content: [{ type: "text" as const, text: `Task ${args.taskId} marked complete: ${args.summary}` }] };
}
