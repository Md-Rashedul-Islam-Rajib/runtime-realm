import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import BlogRouter from '../modules/blogs/blogs.route';
import AdminRouter from '../modules/admin/admin.route';

const router: Router = Router();

const allRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/blogs',
    route: BlogRouter,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route),
);

export default router;
