import * as express from 'express';

const app = express();

app.get('/:id', (req, res) => {
  return res.send(`Welcome to Firebase Cloud Functions: ${req.params.id}`);
});

export { app };
