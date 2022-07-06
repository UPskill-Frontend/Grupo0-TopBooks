import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { inject, injectable } from 'tsyringe';
import { IBookController } from '../controllers/interfaces/IBookController';

@injectable()
export class BookRoute {
    constructor(@inject('IBookController') private controller: IBookController) {}

    routes(app: Router) {
        app.post('/api/book', asyncHandler(this.controller.post));
        app.get('/api/book/top', asyncHandler(this.controller.getTopTenSales));
        app.get('/api/book/new', asyncHandler(this.controller.getNewest));
    }
}
