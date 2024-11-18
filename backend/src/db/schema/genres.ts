import { customType, pgEnum } from "drizzle-orm/pg-core"

/**
 * This is a custom type for genres
 * ! The genres cannnot be removed, only added
 * @author p1xlize
 */

export const genresEnum = pgEnum('genres', [
    "Sci-Fi",
    "Fantasy",
    "Drama",
    "Comedy",
    "Horror",
    "Action & Adventure",
    "Mystery",
    "Romance",
    "History",
    "Thriller",
]
);