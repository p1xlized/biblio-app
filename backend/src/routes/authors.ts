import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as authorsController from '../controllers/authorsController'


export const authors = new Elysia({
    prefix: '/authors'
})
    .use(swagger())
    .get('/', () => {
        return authorsController.getAuthors()
    })


