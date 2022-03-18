import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../common/models/category';
import { lastValueFrom } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {

  }

  addCategory(category: Category) {
    const request = this.http.post<Category>('api/categories', category);
    return lastValueFrom(request);
  }

  gellAllCategories() {
    const request = this.http.get('api/categories');
    return lastValueFrom(request);
  }
  
}