import { container } from 'tsyringe';
import { BookController } from './controllers/BookController';
import { MongoBookRepository } from './repository/mongo/MongoBookRepository';
import { BookService } from './services/BookService';

export default function dependenciesConfig() {
    container.register('IBookController', { useClass: BookController });
    container.register('IBookService', { useClass: BookService });
    container.register('IBookRepository', { useClass: MongoBookRepository });
}
