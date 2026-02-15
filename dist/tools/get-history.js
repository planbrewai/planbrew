import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";
export const getHistorySchema = z.object({
    from: z.string().optional().describe("Start date filter (ISO 8601 format, e.g., '2025-01-01')"),
    to: z.string().optional().describe("End date filter (ISO 8601 format, e.g., '2025-12-31')"),
    limit: z.number().optional().describe("Maximum number of entries to return"),
});
export async function getHistoryHandler(args) {
    const projectId = config.projectId;
    if (!projectId) {
        return { content: [{ type: "text", text: "Error: PLANBREW_PROJECT_ID not set." }] };
    }
    const params = new URLSearchParams();
    if (args.from)
        params.set("from", args.from);
    if (args.to)
        params.set("to", args.to);
    if (args.limit !== undefined)
        params.set("limit", String(args.limit));
    const qs = params.toString();
    const path = `/progress/${encodeURIComponent(projectId)}/feed${qs ? `?${qs}` : ""}`;
    const res = await apiRequest("GET", path);
    if (!res.success) {
        return { content: [{ type: "text", text: `Error fetching activity history: ${res.message}` }] };
    }
    if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
        return { content: [{ type: "text", text: "No activity history found." }] };
    }
    return { content: [{ type: "text", text: JSON.stringify(res.data, null, 2) }] };
}
//# sourceMappingURL=get-history.js.map