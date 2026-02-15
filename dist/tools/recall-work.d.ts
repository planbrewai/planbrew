import { z } from "zod";
export declare const recallWorkSchema: z.ZodObject<{
    query: z.ZodString;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    query: string;
    from?: string | undefined;
    to?: string | undefined;
    limit?: number | undefined;
}, {
    query: string;
    from?: string | undefined;
    to?: string | undefined;
    limit?: number | undefined;
}>;
export declare function recallWorkHandler(args: z.infer<typeof recallWorkSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
