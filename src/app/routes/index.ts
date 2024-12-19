import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';


const router: Router = Router();

const allRoutes = [
  {
    path: '/auth',
    route : AuthRouter
  }
 
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route),
);

export default router;
