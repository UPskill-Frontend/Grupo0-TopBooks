export default interface IBookPersistence {
    title: string;
    isbn: string;
    authorNIF: string;
    publisherCode: string;
    categoryCode: string;
    publishDate: Date;
    sales: number;
}
