import { BookRoute } from './BookRoute';
import { injectable } from 'tsyringe';

@injectable()
class Routes {
    constructor(private _book: BookRoute) {}

    get book(): BookRoute {
        return this._book;
    }
}
export default Routes;
