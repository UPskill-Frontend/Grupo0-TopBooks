import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Role from '../enums/Roles';

export default function authMiddleware(roles: Role[]) {
    return function authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
            if (err || !payload || payload instanceof String || typeof payload === 'string') {
                return res.status(401).json({ error: 'The token provided is invalid' });
            }

            if (!roles.includes(payload.role)) {
                return res.status(403).json({ error: 'You are not authorized to access this resource' });
            }

            req.headers['user'] = JSON.stringify(payload);
            next();
        });
    };
}
