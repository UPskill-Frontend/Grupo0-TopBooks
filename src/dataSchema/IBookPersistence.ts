export default interface IBookPersistence {
    title: string;
    isbn: string;
    authorNIF: string;
    stock: number;
    publisherCode: string;
    categoryCode: string;
    publishDate: Date;
    sales: number;
}
