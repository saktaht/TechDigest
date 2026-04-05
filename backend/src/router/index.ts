import { Express } from 'express';
import { tagRoutes } from './tag';

const routes = (server: Express) => {
  server.use('/api/tag', tagRoutes());

  server.use((_req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
};

export default routes;
