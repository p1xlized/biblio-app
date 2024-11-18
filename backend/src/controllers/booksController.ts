import { db } from '../db/db';
import { books } from '../db/schema/books';
import { eq, is } from 'drizzle-orm';

async function getBooks() {
    try {
        const result = await db.select().from(books);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getBooksById(id: string) {
    try {
        const result = await db.select().from(books).where(eq(books.id, parseInt(id)));
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function updateAvaliability(id: string) {
    try {
        const currentBook = await db.select({ is_available: books.is_available })
            .from(books)
            .where(eq(books.id, parseInt(id)))
            .then(result => result[0]); 

        if (!currentBook) {
            throw new Error(`Book with id ${id} not found.`);
        }

        const result = await db.update(books)
            .set({ is_available: !currentBook.is_available })
            .where(eq(books.id, parseInt(id)));

        return result;
    } catch (error) {
        console.log(error);
    }
}

export { getBooks, getBooksById, updateAvaliability };