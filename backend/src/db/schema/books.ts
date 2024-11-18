import { integer, pgTable, timestamp, varchar, PgArray, serial, boolean } from "drizzle-orm/pg-core";
import { genresEnum } from "./genres";
import { authors } from "./authors";

export const books = pgTable("books", {
    id: serial("id").primaryKey().notNull(),    
    title: varchar("title", { length: 150 }).notNull(),
    description: varchar("description", { length: 255 }),
    publisher: varchar("publisher", { length: 100 }).notNull(),
    author_id: integer("author_id").notNull().references(() => authors.id),
    cover_img: varchar("cover_img", { length: 150 }).unique().notNull(),
    genre: genresEnum().notNull(),    
    published_year: timestamp("published_year"),
    copies_available: integer("copies_available").default(0),
    is_available: boolean("is_available").default(true).notNull(),
});
export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;