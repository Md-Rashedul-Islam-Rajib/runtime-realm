import { Router } from 'express';


const router: Router = Router();

const allRoutes = [
 
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path, singleRoute.route),
);

export default router;
