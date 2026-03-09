import { action } from "./_generated/server";
import { v } from "convex/values";
export const analyzeTrends = action({
    args: { industry: v.string(), region: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are TrendRadar, a trend analyst. Identify emerging trends in the given industry. Output JSON:
{"summary":"<overview>","trends":[{"name":"","description":"","impact":"high|medium|low","timeline":"near-term|mid-term|long-term","confidence":<1-10>}],"opportunities":[""],"threats":[""]}
List 5-8 key trends.` },
                    { role: "user", content: `Industry: ${args.industry}${args.region ? `\nRegion: ${args.region}` : ''}` },
                ], temperature: 0.5, max_tokens: 3000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
