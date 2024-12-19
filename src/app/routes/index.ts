import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import BlogRouter from '../modules/blogs/blogs.route';


const router: Router = Router();

const allRoutes = [
  {
    path: '/auth',
    route : AuthRouter
  },
  {
    path: '/blogs',
    route: BlogRouter
  }
 
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route),
);

export default router;
