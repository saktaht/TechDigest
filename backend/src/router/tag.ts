import { Router } from 'express';
import { createNewTag } from '../controller/tagController';

export const tagRoutes = () => {
  const router = Router();
  router.post('/create', createNewTag);
  return router;
};
