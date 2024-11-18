import { db } from '../db/db';
import { authors } from '../db/schema/authors';
import { eq } from 'drizzle-orm';

async function getAuthors() {
    try {
        const result = await db.select().from(authors);
        return result;
    } catch (error) {
        console.log(error);
    }
}



export { getAuthors };