import IBookDTO from '../dtos/IBookDTO';
import IBookService from './interfaces/IBookService';
import { BookMapper } from '../mappers/BookMapper';
import IBookRepository from '../repository/interfaces/IBookRepository';
import { MongoBookRepository } from '../repository/mongo/MongoBookRepository';

export class BookService implements IBookService {
    constructor(private bookRepository: IBookRepository = new MongoBookRepository()) {}

    createBook = async (bookDto: IBookDTO) => {
        const [categoryExists, publisherExists, authorExists] = await Promise.all([
            this.categoryService.categoryExists(bookDto.categoryCode),
            this.publisherService.publisherExists(bookDto.publisherCode),
            this.authorService.authorExists(bookDto.authorNIF),
        ]);

        if (!categoryExists) {
            throw new Error('Category does not exist');
        }

        if (!publisherExists) {
            throw new Error('Publisher does not exist');
        }

        if (!authorExists) {
            throw new Error('Author does not exist');
        }

        const bookPers = await this.bookRepository.create(BookMapper.toDomain(bookDto));
        return BookMapper.toBookDTO(bookPers);
    };

    getBooksByISBN = async (isbn: string) => {
        const book = await this.bookRepository.findByISBN(isbn);
        if (!book) return book;
        return BookMapper.toBookDTO(book);
    };

    orderBook = async (bookDto: IBookDTO) => {
        const book = await this.bookRepository.findByISBN(bookDto.isbn);
        if (!book) {
            return BookMapper.toBookDTO(await this.createBook(BookMapper.toDomain(bookDto)));
        }

        return BookMapper.toBookDTO(await this.bookRepository.updateStock(book.isbn, book.stock + bookDto.stock));
    };

    getBookByPublisher = async (id: string) => {
        if (!this.publisherService.publisherExists(id)) {
            throw new Error('Publisher doesnt exist');
        }
        const book = await this.bookRepository.getByPublisher(id);
        return book.map((x) => BookMapper.toBookDTO(x));
    };

    sellBook = async (isbn: string) => {
        const book = await this.bookRepository.sell(isbn);
        if (!book) return null;
        return BookMapper.toBookDTO(book);
    };

    getBookByAuthor = async (nif: string) => {
        const bookList = await this.bookRepository.getByPublisher(nif);
        return bookList.map((book) => BookMapper.toBookDTO(book));
    };
}
