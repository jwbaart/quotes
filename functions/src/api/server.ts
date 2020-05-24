import * as express from 'express';
import * as cors from 'cors';
import { test } from './test';
import { customClaim } from './custom-claim';
import { isAuthenticated } from './middleware/is-authenticated';

const api: express.Application = express();

api
  .use(cors())
  .get('/test', test)
  .post('/custom-claim', [isAuthenticated], customClaim)
  .get('/*', (req, res) => res.status(404).json({ success: false, data: 'asdfasdf' }));

export default api;
