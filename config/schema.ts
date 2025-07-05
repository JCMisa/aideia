import {
  index,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: varchar("clerkId", { length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  image: text("image"),
  credits: integer().default(2).notNull(),
  role: varchar("role").default("user").notNull(),
  createdAt: timestamp("createdAt")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const SessionChat = pgTable(
  "sessionChat",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sessionChatId: varchar().notNull().unique(),
    createdBy: varchar("createdBy")
      .notNull()
      .references(() => Users.email, { onDelete: "cascade" }),
    notes: text("notes"),
    selectedDoctor: json("selectedDoctor"),
    conversation: json("conversation"),
    report: json("report"),
    createdAt: timestamp("createdAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("sessionChat_sessionChatId_idx").on(table.sessionChatId),
    index("sessionChat_createdBy_idx").on(table.createdBy),
  ]
);
