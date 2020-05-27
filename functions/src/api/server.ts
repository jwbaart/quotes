import * as express from 'express';
import * as cors from 'cors';
import { customClaim } from './custom-claim/custom-claim';
import { isAuthenticated } from './middleware/is-authenticated';

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
  .post('/custom-claim', [isAuthenticated], customClaim)
  .get('/*', (req, res) => res.status(404).json({ success: false, data: '' }));

export default api;
