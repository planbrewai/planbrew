import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";

export const saveProgressSchema = z.object({
  summary: z.string().describe("What you worked on - be specific about changes made"),
  featureArea: z.string().optional().describe("Which feature area was worked on (e.g., 'auth', 'payments', 'dashboard')"),
  percentComplete: z.number().min(0).max(100).optional().describe("Estimated completion percentage of current work (0-100)"),
});

export async function saveProgressHandler(args: z.infer<typeof saveProgressSchema>) {
  const projectId = config.projectId;
  if (!projectId) {
    return { content: [{ type: "text" as const, text: "Error: PLANBREW_PROJECT_ID not set." }] };
  }

  const body: Record<string, unknown> = {
    projectId,
    summary: args.summary,
  };

  if (args.featureArea) body.featureArea = args.featureArea;
  if (args.percentComplete !== undefined) body.percentComplete = args.percentComplete;

  const res = await apiRequest("POST", "/progress/update", body);

  if (!res.success) {
    return { content: [{ type: "text" as const, text: `Error saving progress: ${res.message}` }] };
  }

  return { content: [{ type: "text" as const, text: `Progress saved: ${args.summary}` }] };
}
