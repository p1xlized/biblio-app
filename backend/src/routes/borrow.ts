import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as booksController from '../controllers/booksController'
import * as userController from '../controllers/userController'
import * as borrowBookController from '../controllers/borrowBookController';
import jwt from '@elysiajs/jwt';



export const borrow = new Elysia({
    prefix: '/borrow'
})
.use(swagger())

.post('/', async ({ query }) => {
    console.log('Received Query:', query);

    try {
        if (!query.user || !query.book) {
            return { error: 'Missing required query parameters: user or book' };
        }

        await borrowBookController.borrowBook(query.user, query.book);
        await booksController.updateAvaliability(query.book);

        return { message: `Successfully borrowed book ${query.book}` };
    } catch (error) {
        console.error('Error occurred:', error);
        return { error: 'An error occurred while borrowing the book' };
    }
}, {
    query: t.Object({
        user: t.String(),
        book: t.String(),
    }),
})
.patch('/extend', async ({ query }) => {
    try {
        if (!query.borrow_id) {
            return { error: 'Missing required query parameters: id' };
        }
        return borrowBookController.extendBorrowTime(query.borrow_id);
        // return
    } catch (error) {
        console.error('Error occurred:', error);
        return { error: 'An error occurred while extending borrow time' };
    }
},{
    query: t.Object({
        borrow_id: t.String(),
    }),
})
.patch('/return', async ({ query }) => {
    try {
        if (!query.borrow_id) {
            return { error: 'Missing required query parameters: id' };
        }
        await borrowBookController.returnBook(query.borrow_id);
        await booksController.updateAvaliability(query.book);
        return
    } catch (error) {
        console.error('Error occurred:', error);
        return  { message: `Successfully returned book ${query.borrow_id}` };
    }
},{
    query: t.Object({
        borrow_id: t.String(),
        book: t.String(),
    }),
})