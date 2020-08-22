import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import NotificationController from './app/controllers/NotificationController';
import DeliveryController from './app/controllers/DeliveryController';
import WithdrawController from './app/controllers/WithdrawController';
import DeliveredController from './app/controllers/DeliveredController';
import AdminProblemsController from './app/controllers/AdminProblemsController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

import UserValidator from './app/validators/UserValidator';
import SessionValidator from './app/validators/SessionValidator';
import RecipientValidator from './app/validators/RecipientValidator';
import DeliverymanValidator from './app/validators/DeliverymanValidator';
import OrderValidator from './app/validators/OrderValidator';
import DeliveredValidator from './app/validators/DeliveredValidator';
import DeliveryProblemsValidator from './app/validators/DeliveryProblemsValidator';
import WithdrawValidator from './app/validators/WithdrawValidator';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserValidator.createValidator, UserController.store);

routes.post(
  '/sessions',
  SessionValidator.createValidator,
  SessionController.store
);

routes.get('/deliverymen/:id/deliveries', DeliveryController.index);

routes.put(
  '/deliverymen/:id/deliveries/:delivery_id/withdraw',
  WithdrawValidator.updateValidator,
  WithdrawController.update
);
routes.put(
  '/deliverymen/:id/deliveries/:delivery_id/delivered',
  DeliveredValidator.updateValidator,
  DeliveredController.update
);

routes.post(
  '/delivery/:id/problems',
  DeliveryProblemsValidator.createValidator,
  DeliveryProblemsController.store
);

/**
 * Routes that require authentication
 */

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymen/:id/notifications', NotificationController.index);
routes.put(
  '/deliverymen/:deliveryman_id/notifications/:id',
  NotificationController.update
);

/**
 * Routes that can only be accessed by the administrator
 */

routes.use(adminMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post(
  '/recipients',
  RecipientValidator.createValidator,
  RecipientController.store
);
routes.put(
  '/recipients/:id',
  RecipientValidator.updateValidator,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post(
  '/deliverymen',
  DeliverymanValidator.createValidator,
  DeliverymanController.store
);
routes.put(
  '/deliverymen/:id',
  DeliverymanValidator.updateValidator,
  DeliverymanController.update
);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderValidator.createValidator, OrderController.store);
routes.put(
  '/orders/:id',
  OrderValidator.updateValidator,
  OrderController.update
);
routes.delete('/orders/:id', OrderController.delete);

routes.delete('/problems/:id/cancel-delivery', AdminProblemsController.delete);
routes.get('/delivery/:id/problems', AdminProblemsController.show);
routes.get('/delivery/problems', AdminProblemsController.index);

routes.put('/users', UserValidator.updateValidator, UserController.update);

export default routes;
