import { Router } from 'express';
import { createUserTags, getUserTagsByUserId } from '../controller/userTagController';

export const userRoutes = () => {
  const router = Router();

  router.get('/:userId/tags', getUserTagsByUserId);
  router.post('/:userId/tags', createUserTags);

  return router;
};
