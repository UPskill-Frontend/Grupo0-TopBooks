import { Book } from '../../domain/Book';

export default interface IBookRepository {
    create: (book: Book) => Promise<Book>;
    findOrderedByPublishDate: () => Promise<Book[]>;
    findOrderedBySales: () => Promise<Book[]>;
}
