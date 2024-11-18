import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { books } from "./books";

export const borrowed_books = pgTable("borrowed_books", {
    id: serial("id").primaryKey().notNull(),
    user_id: integer("user_id").notNull().references(() => user.id),
    book_id: integer("book_id").notNull().references(() => books.id),
    borrowed_date: timestamp("borrowed_date").defaultNow(),
    return_date: timestamp("return_date"),
});
export type BorrowedBooks = typeof borrowed_books.$inferSelect;
export type NewBorrowedBooks = typeof borrowed_books.$inferInsert;