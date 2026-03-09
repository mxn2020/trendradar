import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveReport = mutation({
  args: { industry: v.string(), region: v.optional(v.string()), summary: v.string(), trends: v.array(v.object({ name: v.string(), description: v.string(), impact: v.string(), timeline: v.string(), confidence: v.number() })), opportunities: v.array(v.string()), threats: v.array(v.string()) },
  handler: async (ctx, args) => await ctx.db.insert("reports", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("reports").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
