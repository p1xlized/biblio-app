import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { books } from "./books";

export const wishlist = pgTable("wishlist", {
    id: serial("id").primaryKey().notNull(),
    user_id: integer("user_id").notNull().references(() => user.id),
    book_id: integer("book_id").notNull().references(() => books.id),
    added_date: timestamp("added_date").defaultNow(),
});
