import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

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
