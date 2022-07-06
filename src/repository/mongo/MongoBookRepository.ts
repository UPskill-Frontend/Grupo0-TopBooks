import IBookRepository from '../interfaces/IBookRepository';
import { Book } from '../../domain/Book';
import { BookMapper } from '../../mappers/BookMapper';
import { BookSchema } from '../../persistence/schemas/bookSchema';

export class MongoBookRepository implements IBookRepository {
    create = async (book: Book) => {
        const t = BookMapper.toBookPersistence(book);
        const newBook = await BookSchema.create(t);
        return BookMapper.toDomain(newBook);
    };

    findByISBN = async (isbn: string) => {
        const book = await BookSchema.findOne({ isbn });
        if (!book) {
            return null;
        }
        return BookMapper.toDomain(book);
    };

    updateStock = async (isbn: string, stock: number) => {
        const book = await BookSchema.findOneAndUpdate({ isbn }, { stock }, { new: true });
        if (!book) {
            throw new Error('Book does not exist');
        }
        return BookMapper.toDomain(book);
    };

    getByPublisher = async (id: string): Promise<Book[]> => {
        const bookList = await BookSchema.find({ publisherCode: id });
        return bookList.map((x) => BookMapper.toDomain(x));
    };

    sell = async (isbn: string) => {
        const bookData = await BookSchema.findOne({ isbn: isbn, stock: { $gt: 0 } });
        if (!bookData) return null;
        const newBook = await BookSchema.findOneAndUpdate(
            { isbn: bookData.isbn },
            { $inc: { stock: -1 } },
            { new: true }
        );
        return BookMapper.toDomain(newBook!);
    };

    getBooksByCategory = async (categoryCode: string): Promise<Book[]> => {
        const bookList = await BookSchema.find({ categoryCode });
        return bookList.map((x) => BookMapper.toDomain(x));
    };

    deleteBooksByCategory = async (categoryCode: string): Promise<number> => {
        const bookList = await BookSchema.deleteMany({ categoryCode });
        return bookList.deletedCount;
    };

    getBooksByAuthor = async (nif: string): Promise<Book[]> => {
        const bookList = await BookSchema.find({ authorNIF: nif, stock: { $gt: 0 } });
        return bookList.map((book) => BookMapper.toDomain(book));
    };
}
