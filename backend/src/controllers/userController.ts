import { db } from '../db/db';
import { user } from '../db/schema/user';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { borrowed_books } from '../db/schema/borrowed_books';

async function getUserEmailAndPassword(email: string, password: string) {
    try {
        const result = await db
            .select({
                email: user.email,
                password: user.password,
            })
            .from(user)
            .where(eq(user.email, email));

        if (result.length === 0) {
            throw new Error('User not found');
        }
        // compare passwords
        const isPasswordValid = await bcrypt.compare(password, result[0].password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return true;
    } catch (error) {
        console.error('Error in getUserEmailAndPassword:', error);
        throw error;
    }
}
async function addUserEmailAndPassword(email: string, password: string, username: string) {
    try {
        // ! hashed password to be stored on db
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.insert(user).values({
            email,
            password: hashedPassword,
            username,
        });
        return result;
    } catch (error) {
        console.error('Error in addUserEmailAndPassword:', error);
        throw error;
    }
}
async function getUserByID(id: string) {
    try {
        const rawResult = await db
          .select({
            user,
            borrowed_books,
          })
          .from(user)
          .rightJoin(borrowed_books, eq(user.id, borrowed_books.user_id))
          .where(eq(user.id, parseInt(id)));
    
        if (rawResult.length === 0) {
          return null; 
        }
    
        const transformedResult = {
          user: rawResult[0].user,
          borrowed_books: rawResult.map((row) => row.borrowed_books),
        };
    
        return transformedResult;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Failed to retrieve user data"); // Provide a meaningful error message
      }
}
export { getUserEmailAndPassword, addUserEmailAndPassword, getUserByID };
