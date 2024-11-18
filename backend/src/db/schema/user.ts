import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { genresEnum } from "./genres";
import { books } from "./books";

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    profile_img: varchar("profile_img", { length: 150 }),
    email: varchar("email", { length: 150 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    fav_genre: genresEnum(),
    fav_book: integer("fav_book").references(() => books.id),
    points: integer("points").default(0),
    phone: integer("phone"),
    membership_date: timestamp("membership_date").defaultNow(),
});

export type User = typeof user.$inferSelect;
 