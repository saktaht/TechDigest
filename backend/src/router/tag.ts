import { Router } from 'express';
import { createNewTag, getTags } from '../controller/tagController';

export const tagRoutes = () => {
  const router = Router();
  router.post('/', createNewTag);
  router.get('/', getTags);

  return router;
};
