import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../index.js'
import collections from '../src/collections.js'
import { validationResult } from 'express-validator'
import config from '../config.js'
import User from '../models/User.js'
// import Manager from '../models/Manager.js'
// import Admin from '../models/Admin.js'

function generateAccessToken(id, roles) {
    const pyaload = {
        id, 
        roles,
    }
    return jwt.sign(pyaload, config.secret, {expiresIn: '24h'})
}
class authController {
    async registration(req, res) {
        try {
            const {name, username, password} = req.body
            const candidate = await db.collection('users').findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'user already exists'})
            }
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'registration error'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({name, username, password: hashPassword, roles: ['User']})
            await db.collection('user').insertOne(user)
            return res.json({message: 'user is registered'})
        } catch (e) {
            console.log(e)    
            res.status(400).json({message: 'Registration error!'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await db.collection('users').findOne({username})
            if (!candidate) {
                return res.status(400).json({message: 'user not exists'})
            } else {
                const validPassword = bcrypt.compareSync(password, candidate.password)
                if (!validPassword) {
                    res.status(400).json({message: 'password not right'})
                } else {
                    const token = generateAccessToken(candidate._id, candidate.roles)
                    return res.json({token})
                }
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error!'})
        }
    }
}

export default new authController()