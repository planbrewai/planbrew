import { config } from "./config.js";
export async function apiRequest(method, path, body) {
    const url = `${config.apiUrl}${path}`;
    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": config.apiKey,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        const json = (await res.json());
        return json;
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[planbrew-mcp] API request failed: ${message}`);
        return { success: false, message: `Network error: ${message}` };
    }
}
//# sourceMappingURL=api-client.js.map