import { z } from "zod";
export declare const getLastSessionSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare function getLastSessionHandler(): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
}>;
