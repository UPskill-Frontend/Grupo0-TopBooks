import IBookDTO from '../dtos/IBookDTO';
import IBookPersistence from '../dataSchema/IBookPersistence';
import { Book } from '../domain/Book';

export class BookMapper {
    public static toDTO(book: Book): IBookDTO {
        return {
            title: book.title,
            isbn: book.isbn,
            authorNIF: book.authorNIF,
            stock: book.stock,
            publisherCode: book.publisherCode,
            categoryCode: book.categoryCode,
            publishDate: book.publishDate,
            sales: book.sales,
        };
    }

    public static toPersistence(book: Book): IBookPersistence {
        return {
            title: book.title,
            isbn: book.isbn,
            authorNIF: book.authorNIF,
            stock: book.stock,
            publisherCode: book.publisherCode,
            categoryCode: book.categoryCode,
            publishDate: book.publishDate,
            sales: book.sales,
        };
    }

    public static toDomain(book: IBookDTO | IBookPersistence): Book {
        return Book.createBook(book);
    }
}
