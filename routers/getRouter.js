import { Router } from "express";
import controller from "../controllers/getControllers.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const getRouter = new Router();

// public
getRouter.get('/cars', controller.getCars);
getRouter.get('/cars/:index', controller.getCarByIndex);

// for auth users
getRouter.get('/additional-features', authMiddleware, controller.getAdditionalFeatures);
getRouter.get('/additional-features/:index', authMiddleware, controller.getAdditionalFeatureByIndex);

// admin
getRouter.get('/users', roleMiddleware(['Admin']), controller.getUsers)
getRouter.get('/user', roleMiddleware(['Admin']), controller.getUserByUsername)
getRouter.get('/sales-acts', roleMiddleware(['Admin']), controller.getSalesActs)
// getRouter.get('/sales-acts/:index', roleMiddleware(['Admin']), controller.getSaleAct)

// admin & manager
// getRouter.get('/insurance_policies', roleMiddleware(['Admin', 'Manager']), controller.getInsurancePolicies)
// getRouter.get('/insurance_policies/:index', roleMiddleware(['Admin', 'Manager']), controller.getInsurancePolicieById)

export default getRouter;
