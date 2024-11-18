import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as wishlistController from '../controllers/wishlistController'


export const wishlist = new Elysia({
    prefix: '/wishlist'
})
    .use(swagger())
    .get('/:id', async ({ params: { id } }) => {
        try {
            const result = await wishlistController.getWishlist(id)
            return result
        } catch (error) {
            console.error('Error in getWishlist:', error);
            throw new Error('Failed to get wishlist');
        }
    })
    .post('/', async ({ query }) => {
        try {
            const result = await wishlistController.addBookToWhishlist(query.user_id, query.book_id)
            return result
        } catch (error) {
            console.error('Error in addBookToWhishlist:', error);
            throw new Error('Failed to add book to whishlist');
        }
    }, {
        query: t.Object({
            user_id: t.String(),
            book_id: t.String(),
        })
    })
    .delete('/', async ({ query }) => {
        try {
            const result = await wishlistController.removeBookFromWishlist(query.user_id, query.book_id)
            return result
        } catch (error) {
            console.error('Error in removeBookFromWishlist:', error);
            throw new Error('Failed to remove book from wishlist');
        }
    }, {
        query: t.Object({
            user_id: t.String(),
            book_id: t.String(),
        })
    })



