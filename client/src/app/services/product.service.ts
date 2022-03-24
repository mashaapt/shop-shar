import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../../common/interfaces/product.interface';
import { lastValueFrom } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {

  }

  addProduct(product: Product) {
    const request = this.http.post<Product>('api/products', product);
    return lastValueFrom(request);
  }

  getAllProducts() {
    const request = this.http.get<Product[]>('api/products');
    return lastValueFrom(request);
  }

  deleteProduct(id: string) {
    const request = this.http.delete<Product>(`api/products/${id}`);
    return lastValueFrom(request);
  }
}