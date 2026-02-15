import { z } from "zod";
export declare const logProgressSchema: z.ZodObject<{
    message: z.ZodString;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    message: string;
    durationMinutes?: number | undefined;
}, {
    message: string;
    durationMinutes?: number | undefined;
}>;
export declare function logProgressHandler(args: z.infer<typeof logProgressSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
