import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";
export const saveSessionSchema = z.object({
    summary: z.string().describe("What was accomplished in this coding session"),
    filesChanged: z.array(z.string()).optional().describe("List of files that were changed"),
    featureArea: z.string().optional().describe("Which feature area was worked on (e.g., 'auth', 'payments')"),
    estimatedCompletion: z.number().min(0).max(100).optional().describe("Estimated completion percentage of current feature (0-100)"),
    blockers: z.string().optional().describe("Any blockers encountered during the session"),
});
export async function saveSessionHandler(args) {
    const projectId = config.projectId;
    if (!projectId) {
        return { content: [{ type: "text", text: "Error: PLANBREW_PROJECT_ID not set." }] };
    }
    const body = {
        projectId,
        summary: args.summary,
    };
    if (args.filesChanged)
        body.filesChanged = args.filesChanged;
    if (args.featureArea)
        body.featureArea = args.featureArea;
    if (args.estimatedCompletion !== undefined)
        body.estimatedCompletion = args.estimatedCompletion;
    if (args.blockers)
        body.blockers = args.blockers;
    const res = await apiRequest("POST", "/progress/session-report", body);
    if (!res.success) {
        return { content: [{ type: "text", text: `Error saving session: ${res.message}` }] };
    }
    return { content: [{ type: "text", text: `Session saved.\n${JSON.stringify(res.data, null, 2)}` }] };
}
//# sourceMappingURL=save-session.js.map