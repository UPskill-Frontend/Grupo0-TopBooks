import { Book } from '../../domain/Book';

export default interface IBookRepository {
    create: (book: Book) => Promise<Book>;
    findOrderBySales: () => Promise<Book[]>;
    findOrderByPublishDate: () => Promise<Book[]>;
}
