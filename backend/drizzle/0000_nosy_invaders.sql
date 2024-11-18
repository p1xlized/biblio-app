-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."genres" AS ENUM('Sci-Fi', 'Fantasy', 'Drama', 'Comedy', 'Horror', 'Action & Adventure', 'Mystery', 'Romance', 'History', 'Thriller');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"description" varchar(255),
	"publisher" varchar(100) NOT NULL,
	"author_id" integer NOT NULL,
	"cover_img" varchar(150) NOT NULL,
	"genre" "genres" NOT NULL,
	"published_year" timestamp,
	"copies_available" integer DEFAULT 0,
	CONSTRAINT "books_cover_img_unique" UNIQUE("cover_img")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"profile_img" varchar(150),
	"email" varchar(150) NOT NULL,
	"password" varchar(255) NOT NULL,
	"fav_genre" "genres",
	"fav_book" integer,
	"points" integer DEFAULT 0,
	"phone" integer,
	"membership_date" timestamp DEFAULT now(),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "borrowed_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"borrowed_date" timestamp DEFAULT now(),
	"return_date" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books" ADD CONSTRAINT "books_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_fav_book_books_id_fk" FOREIGN KEY ("fav_book") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/