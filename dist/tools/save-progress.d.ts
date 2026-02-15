import { z } from "zod";
export declare const saveProgressSchema: z.ZodObject<{
    summary: z.ZodString;
    featureArea: z.ZodOptional<z.ZodString>;
    percentComplete: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    featureArea?: string | undefined;
    percentComplete?: number | undefined;
}, {
    summary: string;
    featureArea?: string | undefined;
    percentComplete?: number | undefined;
}>;
export declare function saveProgressHandler(args: z.infer<typeof saveProgressSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
