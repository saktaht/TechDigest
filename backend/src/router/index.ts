import { Express } from 'express';
import { tagRoutes } from './tag';
import { userRoutes } from './user';

const routes = (server: Express) => {
  server.use('/api/tag', tagRoutes());
  server.use('/api/users', userRoutes());

  server.use((_req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });
};

export default routes;
