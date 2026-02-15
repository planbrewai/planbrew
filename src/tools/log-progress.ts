import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";

export const logProgressSchema = z.object({
  message: z.string().describe("What you did - free text like 'worked on auth for 2 hours' or 'fixed the login bug'"),
  durationMinutes: z.number().optional().describe("How long it took in minutes (optional - can also be parsed from message)"),
});

export async function logProgressHandler(args: z.infer<typeof logProgressSchema>) {
  const projectId = config.projectId;
  if (!projectId) {
    return { content: [{ type: "text" as const, text: "Error: PLANBREW_PROJECT_ID not set." }] };
  }

  const body: Record<string, unknown> = {
    projectId,
    message: args.message,
  };

  if (args.durationMinutes !== undefined) body.durationMinutes = args.durationMinutes;

  const res = await apiRequest("POST", "/progress/log", body);

  if (!res.success) {
    return { content: [{ type: "text" as const, text: `Error logging progress: ${res.message}` }] };
  }

  return { content: [{ type: "text" as const, text: `Logged: ${args.message}` }] };
}
