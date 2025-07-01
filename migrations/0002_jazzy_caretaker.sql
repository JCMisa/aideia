CREATE TABLE "sessionChat" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessionChat_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sessionChatId" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"notes" text,
	"conversation" json,
	"report" json,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "sessionChat_sessionChatId_unique" UNIQUE("sessionChatId")
);
--> statement-breakpoint
ALTER TABLE "sessionChat" ADD CONSTRAINT "sessionChat_createdBy_users_email_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;