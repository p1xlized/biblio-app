import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as booksController from '../controllers/booksController'
import jwt from '@elysiajs/jwt';



export const books = new Elysia({
    prefix: '/books'
})
    .use(swagger())
    .get('/', async ({ headers,  }) => {

            return booksController.getBooks()
    })
    .get('/:id', async ({ params: { id } }) => {

        return booksController.getBooksById(id);
    })


