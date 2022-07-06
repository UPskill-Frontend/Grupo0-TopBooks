import IBookDTO from '../dtos/IBookDTO';
import IBookService from './interfaces/IBookService';
import { BookMapper } from '../mappers/BookMapper';
import IBookRepository from '../repository/interfaces/IBookRepository';
import { MongoBookRepository } from '../repository/mongo/MongoBookRepository';
import { Book } from '../domain/Book';

export class BookService implements IBookService {
    constructor(private bookRepository: IBookRepository = new MongoBookRepository()) {}

    createBook = async (bookDto: IBookDTO) => {
        const bookDomain = await this.bookRepository.create(BookMapper.toDomain(bookDto));
        return BookMapper.toDTO(bookDomain);
    };

    getTopTenSales = async () => {
        const booksList = await this.bookRepository.findOrderedBySales();
        return booksList.map((book) => BookMapper.toDTO(book));
    };

    getNewest = async () => {
        return [];
    };
}
