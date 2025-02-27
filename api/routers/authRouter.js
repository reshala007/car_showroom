import { Router } from "express"
import { check } from 'express-validator'
import controller from "../controllers/authController.js"

const router = new Router()

router.post('/registration', [
    check('name', 'name cannot be empty').notEmpty(),
    check('username', 'username cannot be empty').notEmpty(),
    check('password', 'password cannot be short then 4 and max 10').isLength({min: 4, max: 20})
], controller.registration)
router.post('/login', controller.login)

export default router