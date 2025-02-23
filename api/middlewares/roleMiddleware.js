import jwt from "jsonwebtoken"
import config from "../config.js"

function roleMiddleware(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
                next()
            }
        
            try {
                const token = req.headers.authorization.split(' ')[1]
                if (!token) {
                    return res.status(403).json({message: 'user is not authorized'})
                }
                const {roles: userRoles} = jwt.verify(token, config.secret)
                let hasRole = false
                userRoles.forEach(role => {
                    if (roles.includes(role)) {
                        hasRole = true
                    }
                });
                if (!hasRole) {
                    return res.status(403).json({message: 'you do not have access'})
                }
                next()
            } catch (e) {
                console.log(e)
                return res.status(403).json({message: 'user is not authorized'})
        }
    }
}

export default roleMiddleware