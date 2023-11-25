import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})


export class AllProductsComponent implements OnInit {

  products: Product[] = [];
  categories: String[] = [];
  loading: boolean = false;
  CartProducts: any[] = []

  constructor(private service: ProductsService) {

  }
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res
      this.loading = false
    }, error => {
      this.loading = false
      alert("Error")
    }
    )
  }

  getCategories() {
    this.loading = false
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res
      this.loading = false
    }, error => {
      this.loading = false
      alert("Error")
    }
    )
  }

  filterCategorie(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts()
    } else {

      this.getProductsCategry(value)
    }
  }

  getProductsCategry(keyword: string) {
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false
      this.products = res

    })


  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.CartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.CartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("Product is already in your cart")
      } else {
        this.CartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.CartProducts))
      }
    } else {
      this.CartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.CartProducts))

    }

  }
}