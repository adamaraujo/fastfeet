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

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id/deliveries', DeliveryController.index);

routes.put(
  '/deliverymen/:id/deliveries/:delivery_id/withdraw',
  WithdrawController.update
);
routes.put(
  '/deliverymen/:id/deliveries/:delivery_id/delivered',
  DeliveredController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/recipients', adminMiddleware, RecipientController.index);
routes.post('/recipients', adminMiddleware, RecipientController.store);
routes.put('/recipients/:id', adminMiddleware, RecipientController.update);

routes.get('/deliverymen', adminMiddleware, DeliverymanController.index);
routes.post('/deliverymen', adminMiddleware, DeliverymanController.store);
routes.put('/deliverymen/:id', adminMiddleware, DeliverymanController.update);
routes.delete(
  '/deliverymen/:id',
  adminMiddleware,
  DeliverymanController.delete
);

routes.get('/orders', adminMiddleware, OrderController.index);
routes.post('/orders', adminMiddleware, OrderController.store);
routes.put('/orders/:id', adminMiddleware, OrderController.update);
routes.delete('/orders/:id', adminMiddleware, OrderController.delete);

routes.get('/deliverymen/:id/notifications', NotificationController.index);
routes.put(
  '/deliverymen/:deliveryman_id/notifications/:id',
  NotificationController.update
);

routes.get(
  '/delivery/:id/problems',
  adminMiddleware,
  AdminProblemsController.show
);
routes.get(
  '/delivery/problems',
  adminMiddleware,
  AdminProblemsController.index
);

routes.put('/users', adminMiddleware, UserController.update);

export default routes;
