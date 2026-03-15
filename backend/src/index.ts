import express from 'express';
import cors from 'cors';
import { corsMiddleware } from './config/cors';

const app = express();
const port = process.env.PORT || 4000;

// app.use((req, res, next) => {
//   console.log('before cors:', req.method, req.url, 'origin=', req.headers.origin);
//   next();
// });

app.use(cors(corsMiddleware));
// app.options(/.*/, cors(corsMiddleware));
app.use(express.json());

// app.use((req, res, next) => {
//   console.log('after cors:', req.method, req.url);
//   next();
// });

app.get('/health', (_req, res) => {
  console.log('health route hit');
  res.json({
  ok: true,
  from: 'current-index-ts',
})});

app.listen(port, () => {
  console.log(`API server on http://localhost:${port}`);
});