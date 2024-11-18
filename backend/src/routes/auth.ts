import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import * as userController from '../controllers/userController'
// import jwt from '@elysiajs/jwt'


export const auth = new Elysia({
  prefix: '/auth'
})
  // .use(
  //   jwt({
  //     name: 'jwt',
  //     secret: process.env.JWT_SECRETS!,
  //     signOptions: {
  //       expiresIn: '7d'
  //     }
  //   })
  // )
  .use(swagger())
  .post('/register', ({ body, }) => {
    return userController.addUserEmailAndPassword(body.email, body.password, body.username)
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      username: t.String()
    })

  })
  .post(
    '/login',
    
    async ({ body, jwt }) => {
      try {

        const result = await userController.getUserEmailAndPassword(body.email, body.password);
        if (result) {
          const token = await jwt.sign({ email: body.email });
          return { token };
        } else {
          return { error: 'Invalid credentials' };
        }
      } catch (error) {
        console.error('Error occurred:', error);
        return { error: 'Error occurred during login' };
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  );
