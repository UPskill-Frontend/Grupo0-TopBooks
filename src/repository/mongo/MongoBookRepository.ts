import IBookRepository from '../interfaces/IBookRepository';
import { Book } from '../../domain/Book';
import { BookSchema } from '../../persistence/schemas/bookSchema';
import { BookMapper } from '../../mappers/BookMapper';

export class MongoBookRepository implements IBookRepository {
    create = async (book: Book) => {
        const newBookPers = await BookSchema.create(BookMapper.toPersistence(book));
        return BookMapper.toDomain(newBookPers);
    };

    findOrderedBySales = async () => {
        const booksList = await BookSchema.find().sort({ sales: -1 }).limit(10);
        return booksList.map((book) => BookMapper.toDomain(book));
    };

    findOrderByPublishDate = async () => {
        const booksList = await BookSchema.find().sort({ publishDate: -1 }).limit(10);
        return booksList.map((book) => BookMapper.toDomain(book));
    };
}
