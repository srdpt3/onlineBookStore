import { Book } from './book';

export class CartItem {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    qty: number;


    constructor(book: Book) {
        this.id = book.id;
        this.name = book.name;
        this.imageUrl = book.imageUrl;
        this.unitPrice = book.unitPrice;
        this.qty = 1


    }
}