import IBookRepository from '../interfaces/IBookRepository';
import { Book } from '../../domain/Book';

export class MongoBookRepository implements IBookRepository {
    create = async (book: Book) => {
        return {} as Book;
    };

    findOrderBySales = async () => {
        return [];
    };

    findOrderByPublishDate = async () => {
        return [];
    };
}
