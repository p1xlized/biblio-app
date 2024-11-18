import { and, eq } from 'drizzle-orm';
import { db } from '../db/db';
//import { borrowed_books } from '../db/schema/borrowed_books';
import { wishlist } from '../db/schema/wishlist';

export async function addBookToWhishlist(userId: string, bookId: string) {
    try {
        const result = await db.insert(wishlist).values({ user_id: parseInt(userId, 10), book_id: parseInt(bookId, 10) });
        return result;
    } catch (error) {
        console.error('Error in addBookToWhishlist:', error);
        throw new Error('Failed to add book to whishlist');
    }
}
export async function removeBookFromWishlist(userId: string, bookId: string) {
    try {
        const result = await db.delete(wishlist).where(and(eq(wishlist.user_id, userId), eq(wishlist.book_id, bookId)));
        return result;
    } catch (error) {
        console.error('Error in removeBookFromWishlist:', error);
        throw new Error('Failed to remove book from wishlist');
    }
}

export async function getWishlist(userId: string) {
    try {
        const result = await db.select().from(wishlist).where(eq(wishlist.user_id, userId));
        return result;
    } catch (error) {
        console.error('Error in getWishlist:', error);
        throw new Error('Failed to get wishlist');
    }
}