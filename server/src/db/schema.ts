import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  char,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

import { Shape } from "./shapeTypes.js";

export const userTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 225 }).unique().notNull(),
  fname: varchar({ length: 225 }).notNull(),
  lname: varchar({ length: 225 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const whiteboardTable = pgTable("whiteboards", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 225 }).unique().notNull(),
  passcode: char("passcode", { length: 6 }),
  shapes: jsonb().$type<Shape[]>().default([]).notNull(),
  adminId: uuid("adminId").references(() => userTable.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const roleEnum = pgEnum("role_enum", ["admin", "editor", "viewer"]);

export const whiteboardMembersTable = pgTable("whiteboardMembers", {
  id: uuid("id").primaryKey().defaultRandom(),
  whiteboardId: uuid("whiteboardId").references(() => whiteboardTable.id),
  userIds: uuid("userIds").references(() => userTable.id),
  role: roleEnum("role").default("viewer").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});
