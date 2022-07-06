import IBookDTO from '../dtos/IBookDTO';

export class Book {
    private constructor(
        public title: string,
        public isbn: string,
        public authorNIF: string,
        public stock: number,
        public publisherCode: string,
        public categoryCode: string,
        public publishDate: Date,
        public sales: number
    ) {}

    public static createBook(book: IBookDTO): Book {
        if (
            book.title &&
            book.isbn &&
            book.authorNIF &&
            book.stock !== null &&
            book.publisherCode &&
            book.categoryCode &&
            book.publishDate &&
            book.sales
        ) {
            return new Book(
                book.title,
                book.isbn,
                book.authorNIF,
                book.stock,
                book.publisherCode,
                book.categoryCode,
                book.publishDate,
                book.sales
            );
        } else {
            throw new Error("Book Fields can't be null");
        }
    }
}
