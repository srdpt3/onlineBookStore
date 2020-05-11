import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();


  addToCart(theCartItem: CartItem) {
    let alreadyExistCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(temp => temp.id === theCartItem.id)
      alreadyExistCart = (existingCartItem != undefined)
    }

    if (alreadyExistCart) {
      existingCartItem.qty++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.caculateTotalPrice();
  }

  caculateTotalPrice() {
    let totalPrice: number = 0;
    let totalQty: number = 0;

    for (let current of this.cartItems) {
      totalPrice += current.qty * current.unitPrice;
      totalQty += current.qty;
    }

    this.totalPrice.next(totalPrice);
    this.totalQty.next(totalQty);

  }

  constructor() { }
}
