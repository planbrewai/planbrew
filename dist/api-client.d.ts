interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}
export declare function apiRequest<T = unknown>(method: string, path: string, body?: Record<string, unknown>): Promise<ApiResponse<T>>;
export {};
