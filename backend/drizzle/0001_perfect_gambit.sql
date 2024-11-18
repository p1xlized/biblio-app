ALTER TABLE "authors" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "author_img" varchar(150);--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "bio" varchar(255);--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "birth_date" varchar(50);--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_author_img_unique" UNIQUE("author_img");