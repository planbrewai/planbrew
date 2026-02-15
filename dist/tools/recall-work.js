import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";
export const recallWorkSchema = z.object({
    query: z.string().describe("Search query to find past work (e.g., 'auth refactor', 'payment bug fix')"),
    from: z.string().optional().describe("Start date filter (ISO 8601 format, e.g., '2025-01-01')"),
    to: z.string().optional().describe("End date filter (ISO 8601 format, e.g., '2025-12-31')"),
    limit: z.number().optional().describe("Maximum number of results to return"),
});
export async function recallWorkHandler(args) {
    const projectId = config.projectId;
    if (!projectId) {
        return { content: [{ type: "text", text: "Error: PLANBREW_PROJECT_ID not set." }] };
    }
    const params = new URLSearchParams();
    params.set("q", args.query);
    if (args.from)
        params.set("from", args.from);
    if (args.to)
        params.set("to", args.to);
    if (args.limit !== undefined)
        params.set("limit", String(args.limit));
    const res = await apiRequest("GET", `/progress/${encodeURIComponent(projectId)}/search?${params.toString()}`);
    if (!res.success) {
        return { content: [{ type: "text", text: `Error searching work history: ${res.message}` }] };
    }
    const data = res.data;
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return { content: [{ type: "text", text: `No results found for "${args.query}".` }] };
    }
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}
//# sourceMappingURL=recall-work.js.map