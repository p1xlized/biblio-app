import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
    id: serial("id").primaryKey().notNull(),    
    name: varchar("name", { length: 100 }).notNull(),
    author_img: varchar("author_img", { length: 150 }).unique(),
    bio: varchar("bio", { length: 255 }),
    birth_date: varchar("birth_date", { length: 50 }),
});
export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;