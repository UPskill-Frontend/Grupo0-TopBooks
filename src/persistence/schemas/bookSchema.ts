import { Schema, model, Document } from 'mongoose';
import IBookPersistence from '../../dataSchema/IBookPersistence';

const Book = new Schema({
    title: { type: String },
    isbn: { type: String, unique: true },
    authorNIF: { type: String },
    publisherCode: { type: String },
    categoryCode: { type: String },
    publishDate: { type: Date },
    sales: { type: Number },
});

const BookSchema = model<Document & IBookPersistence>('Book', Book);
export { BookSchema };
