import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";

export const getStatusSchema = z.object({});

export async function getStatusHandler() {
  const projectId = config.projectId;
  if (!projectId) {
    return { content: [{ type: "text" as const, text: "Error: PLANBREW_PROJECT_ID not set." }] };
  }

  const res = await apiRequest(
    "GET",
    `/progress/${encodeURIComponent(projectId)}/overview`
  );

  if (!res.success) {
    return { content: [{ type: "text" as const, text: `Error fetching project status: ${res.message}` }] };
  }

  return { content: [{ type: "text" as const, text: JSON.stringify(res.data, null, 2) }] };
}
