import IBookDTO from '../../dtos/IBookDTO';

export default interface IBookService {
    createBook: (bookDto: IBookDTO) => Promise<IBookDTO>;
    getBooksByISBN: (isbn: string) => Promise<IBookDTO | null>;
    orderBook: (book: IBookDTO) => Promise<IBookDTO>;
    getBookByPublisher: (id: string) => Promise<IBookDTO[]>;
    getBookByAuthor: (nif: string) => Promise<IBookDTO[]>;
    sellBook: (isbn: string) => Promise<IBookDTO | null>;
}
