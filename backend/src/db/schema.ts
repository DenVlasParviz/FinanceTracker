import {
  pgTable,
  text,
  integer,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

export const categoriesTable = pgTable("categories",{
  id:varchar("id",{length:36}).primaryKey(),
  name:text("name").notNull(),
  checked:boolean("checked").default(false),
  level:integer("level").notNull(),
  assigned:integer("budgeted").default(0),
  activity:integer("activity").default(0),
  available:integer("available").default(0),
  isParent:boolean("isParent").default(false),
  parentId: varchar("parentId", { length: 36 }),
});