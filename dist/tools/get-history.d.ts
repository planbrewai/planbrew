import { z } from "zod";
export declare const getHistorySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    from?: string | undefined;
    to?: string | undefined;
    limit?: number | undefined;
}, {
    from?: string | undefined;
    to?: string | undefined;
    limit?: number | undefined;
}>;
export declare function getHistoryHandler(args: z.infer<typeof getHistorySchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
