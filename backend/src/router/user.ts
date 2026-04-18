import { Router } from 'express';
import { createUserTags } from '../controller/userTagController';

export const userRoutes = () => {
  const router = Router();

  router.post('/:userId/tags', createUserTags);

  return router;
};
