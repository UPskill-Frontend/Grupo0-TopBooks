import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import Role from '../enums/Roles';

interface IPayload extends JwtPayload {
    role: Role;
    // name: string;
    // email: string;
}

export default function authMiddleware(roles: Role[]) {
    return function authenticateToken(req: Request, res: Response, next: Function) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
            const p = payload as IPayload;
            if (err || !roles.includes(p.role)) return res.status(403).json({ error: 'Not allowed' });
            next();
        });
    };
}
