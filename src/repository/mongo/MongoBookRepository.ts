import IBookRepository from '../interfaces/IBookRepository';
import { Book } from '../../domain/Book';
import { BookSchema } from '../../persistence/schemas/bookSchema';
import { BookMapper } from '../../mappers/BookMapper';

export class MongoBookRepository implements IBookRepository {
    create = async (book: Book) => {
        const newBookPers = await BookSchema.create(BookMapper.toPersistence(book));
        return BookMapper.toDomain(newBookPers);
    };

    findOrderBySales = async () => {
        return [];
    };

    findOrderByPublishDate = async () => {
        return [];
    };
}
