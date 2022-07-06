import { NextFunction, Request, Response } from 'express';
import IBookDTO from '../dtos/IBookDTO';
import { IBookController } from './interfaces/IBookController';
import IBookService from '../services/interfaces/IBookService';
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookController implements IBookController {
    constructor(@inject('IBookService') private bookService: IBookService) {}

    post = async (req: Request, res: Response, next: NextFunction) => {
        const bookDto: IBookDTO = { ...req.body, publishDate: new Date(req.body.publishDate) };
        const newBook = await this.bookService.createBook(bookDto);
        res.status(201).send(newBook);
    };

    getTopTenSales = async (req: Request, res: Response, next: NextFunction) => {
        const salesList = await this.bookService.getTopTenSales();
        res.status(200).send(salesList);
    };

    getNewest = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).send();
    };
}
