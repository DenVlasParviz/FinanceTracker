CREATE TABLE "categories" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"checked" boolean DEFAULT false,
	"level" integer NOT NULL,
	"budgeted" integer DEFAULT 0,
	"activity" integer DEFAULT 0,
	"available" integer DEFAULT 0,
	"is_parent" boolean DEFAULT false,
	"parent_id" varchar(36)
);
