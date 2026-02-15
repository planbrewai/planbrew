import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";

export const getLastSessionSchema = z.object({});

export async function getLastSessionHandler() {
  const projectId = config.projectId;
  if (!projectId) {
    return { content: [{ type: "text" as const, text: "Error: PLANBREW_PROJECT_ID not set." }] };
  }

  const res = await apiRequest(
    "GET",
    `/progress/${encodeURIComponent(projectId)}/last-session`
  );

  if (!res.success) {
    return { content: [{ type: "text" as const, text: `Error fetching last session: ${res.message}` }] };
  }

  if (!res.data) {
    return { content: [{ type: "text" as const, text: "No previous sessions found." }] };
  }

  return { content: [{ type: "text" as const, text: JSON.stringify(res.data, null, 2) }] };
}
