CREATE TABLE "sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sessionId" varchar(255) NOT NULL,
	"doctorId" integer NOT NULL,
	"clerkId" varchar(255) NOT NULL,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "sessions_sessionId_unique" UNIQUE("sessionId")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_clerkId_users_clerkId_fk" FOREIGN KEY ("clerkId") REFERENCES "public"."users"("clerkId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "doctorId_sessions_idx" ON "sessions" USING btree ("doctorId");--> statement-breakpoint
CREATE INDEX "userId_sessions_idx" ON "sessions" USING btree ("clerkId");--> statement-breakpoint
CREATE INDEX "createdAt_sessions_idx" ON "sessions" USING btree ("createdAt");--> statement-breakpoint
CREATE UNIQUE INDEX "sessionChat_sessionChatId_idx" ON "sessionChat" USING btree ("sessionChatId");--> statement-breakpoint
CREATE INDEX "sessionChat_createdBy_idx" ON "sessionChat" USING btree ("createdBy");