import { NextFunction, Request, Response } from 'express';

interface IBookController {
    post: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTopTenSales: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getNewest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { IBookController };
