import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { borrowed_books } from '../db/schema/borrowed_books';
async function extendBorrowTime(id: string) {
    try {
        const result = await db
            .select({ return_date: borrowed_books.return_date })
            .from(borrowed_books)
            .where(eq(borrowed_books.id, parseInt(id)))
            .then(result => result[0]);

        if (!result) {
            throw new Error(`Borrowed book with id ${id} not found.`);
        }
        const dueDate = new Date(result.return_date!)

        dueDate.setDate(dueDate.getDate() + 14);;
        console.log(dueDate)

        const extendedBorrowTime = await db.update(borrowed_books)
            .set({ return_date: dueDate })
            .where(eq(borrowed_books.id, parseInt(id)));

        return `Successfully extended borrow time for book ${id}`
    } catch (error) {
        console.error('Error in extendBorrowTime:', error);
        throw new Error('Failed to extend borrow time');
    }
}

async function borrowBook(user_id: string, book_id: string) {
    try {
        const now = new Date();
        const dueDate = new Date(now);
        dueDate.setDate(now.getDate() + 14);

        const result = await db.insert(borrowed_books).values({
            user_id: parseInt(user_id, 10),
            book_id: parseInt(book_id, 10),
            return_date: dueDate,
        });

        return {
            result,
            returnDate: dueDate.toISOString()
        };
    } catch (error) {
        console.error('Error in borrowBook:', error);
        throw new Error('Failed to borrow book');
    }
}

async function returnBook(id: string) {
    try {
        const now = new Date();
        const dueDate = new Date(now);
        console.log(dueDate)
        const result = await db.update(borrowed_books).set({ return_date: dueDate }).where(eq(borrowed_books.id, parseInt(id)))
        result
    }
    catch (error) {
        console.error('Error in returnBook:', error);
        throw new Error('Failed to return book');
    }
}
export { borrowBook, extendBorrowTime, returnBook }