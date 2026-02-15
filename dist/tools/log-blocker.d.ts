import { z } from "zod";
export declare const logBlockerSchema: z.ZodObject<{
    description: z.ZodString;
    severity: z.ZodOptional<z.ZodEnum<["LOW", "MEDIUM", "HIGH"]>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    severity?: "LOW" | "MEDIUM" | "HIGH" | undefined;
}, {
    description: string;
    severity?: "LOW" | "MEDIUM" | "HIGH" | undefined;
}>;
export declare function logBlockerHandler(args: z.infer<typeof logBlockerSchema>): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
