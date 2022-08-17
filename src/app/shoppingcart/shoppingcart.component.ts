import { Component, OnInit } from '@angular/core';
import { ProductCart } from 'src/_models/productCart';
import { CommonService } from 'src/_services/common.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent implements OnInit {
  products: any;
  totalAmount: number = 0;
  productsinCart: ProductCart[] = [];
  constructor(private services: CommonService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.services.getProducts().subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
    });
  }

  addProduct(id: number) {
    let isExist = false;
    this.productsinCart.forEach((e) => {
      if (e.id === id) {
        isExist = true;
        e.quantity++;
      }
    });

    if (!isExist) {
      let product = this.products[id];
      this.productsinCart.push({
        id: id,
        quantity: 1,
        title: product.title,
        price: product.price,
      });
    }

    this.calcTotalAmount();
  }

  removeProduct(id: number) {
    this.productsinCart.forEach((e, index) => {
      if (e.id === id) {
        this.productsinCart.splice(index, 1);
      }
    });
    this.calcTotalAmount();
  }

  increaseProduct(id: number) {
    this.productsinCart.forEach((e) => {
      if (e.id === id) {
        e.quantity++;
      }
    });
    this.calcTotalAmount();
  }

  decreaseProduct(id: number) {
    this.productsinCart.forEach((e) => {
      if (e.id === id) {
        if (e.quantity > 1) {
          e.quantity--;
        } else {
          this.removeProduct(id);
        }
      }
    });
    this.calcTotalAmount();
  }

  calcTotalAmount() {
    this.totalAmount = 0;
    this.productsinCart.forEach((e) => {
      this.totalAmount = this.totalAmount + e.price * e.quantity;
    });
  }

  checkExist(id: number) {
    let isExist = false;
    this.productsinCart.forEach((e) => {
      if (e.id === id) {
        isExist = true;
      }
    });
    return isExist;
  }
}
