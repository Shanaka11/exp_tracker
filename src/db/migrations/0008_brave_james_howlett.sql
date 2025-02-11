CREATE TABLE "goal" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "goal_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(100) NOT NULL,
	"user_id" varchar(40) NOT NULL,
	"target_amount" integer NOT NULL,
	"allocated_amount" integer NOT NULL,
	"target_date" timestamp NOT NULL,
	"icon" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "note" SET NOT NULL;