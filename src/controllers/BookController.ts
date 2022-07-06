import { NextFunction, Request, Response } from 'express';
import IBookDTO from '../dtos/IBookDTO';
import { IBookController } from './interfaces/IBookController';
import IBookService from '../services/interfaces/IBookService';
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookController implements IBookController {
    constructor(@inject('IBookService') private bookService: IBookService) {}

    post = async (req: Request, res: Response, next: NextFunction) => {
        res.status(201).send();
    };

    getTopTenSales = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send();
    };

    getNewest = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send();
    };
}
