import { Router } from 'express';
import { logger } from '../utils/logger.utils';
import { post } from '../controllers/service.controller';

const serviceRouter = Router();

serviceRouter.get('/', async (req, res, next) => {  
  res.status(200).send({ message: 'test-service GET updated successfully' });
});

serviceRouter.post('/', async (req, res, next) => {
  logger.info('Service post message received - AAA');

  try {
    await post(req, res);
  } catch (error) {
    next(error);
  }
});

export default serviceRouter;
