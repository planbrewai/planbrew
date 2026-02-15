import { z } from "zod";
import { config } from "../config.js";
import { apiRequest } from "../api-client.js";
export const logBlockerSchema = z.object({
    description: z.string().describe("Description of the blocker or impediment"),
    severity: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().describe("Blocker severity (default: MEDIUM)"),
});
export async function logBlockerHandler(args) {
    const projectId = config.projectId;
    if (!projectId) {
        return { content: [{ type: "text", text: "Error: PLANBREW_PROJECT_ID not set." }] };
    }
    const res = await apiRequest("POST", "/progress/blocker", {
        projectId,
        description: args.description,
        severity: args.severity || "MEDIUM",
    });
    if (!res.success) {
        return { content: [{ type: "text", text: `Error logging blocker: ${res.message}` }] };
    }
    return { content: [{ type: "text", text: `Blocker logged: ${args.description}` }] };
}
//# sourceMappingURL=log-blocker.js.map