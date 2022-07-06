import { Book } from '../../domain/Book';

export default interface IBookRepository {
    create: (book: Book) => Promise<Book>;
    findOrderedBySales: () => Promise<Book[]>;
    findOrderByPublishDate: () => Promise<Book[]>;
}
