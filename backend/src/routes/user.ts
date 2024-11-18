import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as userController from '../controllers/userController'
import { genresEnum } from '../types/genre.type';
import jwt from '@elysiajs/jwt';
import * as borrowBookController from '../controllers/borrowBookController';

const genresEnumObject = genresEnum.reduce((acc, genre) => {
    acc[genre] = genre;
    return acc;
  }, {} as Record<string, string>);

export const user = new Elysia({
    prefix: '/profile'
})
    .use(swagger())
    .get('/:id', async ({ params: { id }, jwt, headers }) => {
        const authHeader = headers['authorization'];
        if (!authHeader) {
            return { error: 'Authorization token is required' };
        }
        const token = await jwt.verify(authHeader);
        if (token) {
            return userController.getUserByID(id);
        }
        return "Unauthorized"
    })
    .patch('/:id', async ({ params: { id }, body }) => {
        //return `${id} and ${body}`
        //return userController.updateUser(id, body);
    }, {
        body: t.Object({
            username: t.String(),
            profile_img: t.String(),
            email: t.String(),
            password: t.String(),
            fav_genre: t.Optional(t.Enum(genresEnumObject)),
            fav_book: t.Optional(t.Number()),
            points: t.Optional(t.Number()),
            phone: t.Optional(t.Number()),
        })
    })
