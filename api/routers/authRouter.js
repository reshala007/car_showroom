import { Router } from "express"
import { check } from 'express-validator'
import controller from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"

const router = new Router()

router.post('/registration', [
    check('username', 'name cannot be empty').notEmpty(),
    check('password', 'password cannot be short then 4 and max 10').isLength({min: 4, max: 20})
], controller.registration)
router.post('/login', controller.login)
router.get('/cars', authMiddleware, controller.getCars)

export default router