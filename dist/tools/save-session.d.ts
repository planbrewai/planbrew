import { z } from "zod";
export declare const saveSessionSchema: z.ZodObject<{
    summary: z.ZodString;
    filesChanged: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    featureArea: z.ZodOptional<z.ZodString>;
    estimatedCompletion: z.ZodOptional<z.ZodNumber>;
    blockers: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    summary: string;
    featureArea?: string | undefined;
    filesChanged?: string[] | undefined;
    estimatedCompletion?: number | undefined;
    blockers?: string | undefined;
}, {
    summary: string;
    featureArea?: string | undefined;
    filesChanged?: string[] | undefined;
    estimatedCompletion?: number | undefined;
    blockers?: string | undefined;
}>;
export declare function saveSessionHandler(args: z.infer<typeof saveSessionSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
