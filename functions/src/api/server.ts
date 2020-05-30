import * as express from 'express';
import * as cors from 'cors';
import { isAuthenticated } from './middleware/is-authenticated';
import { userRole } from './role/role';

declare module 'express-serve-static-core' {
  interface Request {
    claims?: {
      [key: string]: any;
    };
  }
}

const api: express.Application = express();

api
  .use(cors())
  .post('/user-role', [isAuthenticated], userRole)
  .get('/*', (req, res) => res.status(404));

export default api;
