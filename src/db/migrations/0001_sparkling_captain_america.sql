CREATE TABLE "cost_bucket" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "cost_bucket_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(20) NOT NULL,
	"description" varchar(100)
);
--> statement-breakpoint
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_email_unique";--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "is_expense" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "cost_bucket_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "user_id" varchar(40) NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_cost_bucket_id_cost_bucket_id_fk" FOREIGN KEY ("cost_bucket_id") REFERENCES "public"."cost_bucket"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "transaction" DROP COLUMN "email";