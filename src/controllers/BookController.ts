import { NextFunction, Request, Response } from 'express';
import IBookDTO from '../dtos/IBookDTO';
import { IBookController } from './interfaces/IBookController';
import IBookService from '../services/interfaces/IBookService';
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookController implements IBookController {
    constructor(@inject('IBookService') private bookService: IBookService) {}

    post = async (req: Request, res: Response, next: NextFunction) => {
        const bookDto: IBookDTO = req.body;
        res.status(201).json(await this.bookService.createBook(bookDto));
    };

    orderBook = async (req: Request, res: Response, next: NextFunction) => {
        const isbn: string = req.params.isbn;
        const bookDTO: IBookDTO = { ...req.body, isbn };

        res.status(200).json(await this.bookService.orderBook(bookDTO));
    };

    getBooksByISBN = async (req: Request, res: Response, next: NextFunction) => {
        const book = await this.bookService.getBooksByISBN(req.params.isbn);
        if (!book) {
            throw new Error('The book with the provided ISBN is not available or is inexistent.');
        }
        res.json(book);
    };
    getByPublisher = async (req: Request, res: Response, next: NextFunction) => {
        res.json(await this.bookService.getBookByPublisher(req.params.id));
    };

    sell = async (req: Request, res: Response, next: NextFunction) => {
        const bookISBN: string = req.params.isbn;
        const sellCheck = await this.bookService.sellBook(bookISBN);
        if (!sellCheck) throw new Error('No stock for the book selected');
        else res.status(200).json(sellCheck);
    };

    getByAuthor = async (req: Request, res: Response, next: NextFunction) => {
        const nif: string = req.params.nif;
        const bookList = await this.bookService.getBookByAuthor(nif);
        res.status(200).json(bookList);
    };
}
