import IBookDTO from '../../dtos/IBookDTO';

export default interface IBookService {
    createBook: (bookDto: IBookDTO) => Promise<IBookDTO>;
    getTopTenSales: () => Promise<IBookDTO[]>;
    getNewest: () => Promise<IBookDTO[]>;
}
