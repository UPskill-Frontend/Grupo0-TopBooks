import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { inject, injectable } from 'tsyringe';
import { IBookController } from '../controllers/interfaces/IBookController';
import Role from '../enums/Roles';
import authMiddleware from '../middlewares/authMiddleware';

@injectable()
export class BookRoute {
    constructor(@inject('IBookController') private controller: IBookController) {}

    routes(app: Router) {
        app.post('/api/book', asyncHandler(this.controller.post));
        app.get('/api/book/top', authMiddleware([Role.CLIENT]), asyncHandler(this.controller.getTopTenSales));
        app.get('/api/book/new', authMiddleware([Role.CLIENT]), asyncHandler(this.controller.getNewest));
    }
}
