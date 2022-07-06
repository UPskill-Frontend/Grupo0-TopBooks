import { NextFunction, Request, Response } from 'express';

export default function (error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
    } else if (error instanceof String) {
        res.status(400).json({ message: error });
    } else {
        res.status(400).json({ message: JSON.stringify(error) });
    }
}
