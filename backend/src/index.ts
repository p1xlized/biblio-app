import { swagger } from '@elysiajs/swagger';
import jwt from '@elysiajs/jwt';
import { Elysia } from 'elysia';
import { books } from './routes/books';
import { authors } from './routes/authors';
import { auth } from './routes/auth';
import { cors } from '@elysiajs/cors';
import { user } from './routes/user';
import { borrow } from './routes/borrow';
import { wishlist } from './routes/wishlist';

new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Book Management API',
          version: '0.0.1',
        },
      },
    })
  )
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRETS!,
      signOptions: {
        expiresIn: '7d',
      },
    })
  )
  .use(books)
  .use(authors)
  .use(auth)
  .use(user)
  .use(borrow)
  .use(wishlist)
  .listen(3000);
