import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Routes from './routes/Routes';
import { container, injectable } from 'tsyringe';
import errorHandler from './middlewares/errorHandler';
import dependenciesConfig from './config';

@injectable()
export class App {
    public app: Application = express();
    // public routes: Routes = new Routes();
    public mongoUrl: string = `${process.env.MONGO_URI || ''}${process.env.MONGO_DATABASE || ''}${
        process.env.MONGO_OPTIONS || ''
    }`;

    constructor(public routes: Routes) {
        this.config();
        this.mongoSetup();
        this.routes.book.routes(this.app);
        this.app.use(errorHandler);
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl).then(
            () => console.log('Connected to database'),
            () => console.error('Connection failed')
        );
    }
}

dependenciesConfig();

const app = container.resolve(App);

export default app.app;
