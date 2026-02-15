import { z } from "zod";
export declare const markCompleteSchema: z.ZodObject<{
    taskId: z.ZodString;
    summary: z.ZodString;
    filesChanged: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    taskId: string;
    filesChanged?: string[] | undefined;
}, {
    summary: string;
    taskId: string;
    filesChanged?: string[] | undefined;
}>;
export declare function markCompleteHandler(args: z.infer<typeof markCompleteSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
