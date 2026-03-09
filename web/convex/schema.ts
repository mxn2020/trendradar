import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  reports: defineTable({
    industry: v.string(), region: v.optional(v.string()),
    summary: v.string(),
    trends: v.array(v.object({ name: v.string(), description: v.string(), impact: v.string(), timeline: v.string(), confidence: v.number() })),
    opportunities: v.array(v.string()), threats: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
