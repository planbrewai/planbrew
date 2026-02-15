import { z } from "zod";
export declare const getStatusSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare function getStatusHandler(): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
