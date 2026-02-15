import { config } from "./config.js";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export async function apiRequest<T = unknown>(
  method: string,
  path: string,
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
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

    const json = (await res.json()) as ApiResponse<T>;
    return json;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[planbrew-mcp] API request failed: ${message}`);
    return { success: false, message: `Network error: ${message}` };
  }
}
