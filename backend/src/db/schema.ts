import {
  pgTable,
  text,
  integer,
  varchar,
  boolean,
  timestamp,
  date,
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

export const categoryTargetsTable = pgTable("category_targets", {
  id: varchar("id", { length: 36 }).primaryKey(),
  categoryId: varchar("categoryId", { length: 36 })
    .notNull()
    .references(() => categoriesTable.id), // <-- связь с категориями
  targetAmount: integer("targetAmount").notNull(),
  assignedSoFar: integer("assignedSoFar").default(0),
  targetType: text("targetType").notNull(),
  targetDate: date("targetDate"),
  weeklyDays: text("weeklyDays").array(),
  monthlyDays: integer("monthlyDays").array(),
  isComplete: boolean("isComplete").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const budgetTable = pgTable('budget', {
  id: varchar('id', { length: 36 }).primaryKey(),
  total: integer().notNull(),
  assignedSum: integer().default(0),
  updatedAt: timestamp().defaultNow(),
});

export const accountsTable = pgTable('accounts', {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  balance: integer("balance").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})