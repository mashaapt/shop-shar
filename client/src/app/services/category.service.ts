import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../common/interfaces/category.interface';
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

  getAllCategories() {
    const request = this.http.get<Category[]>('api/categories');
    return lastValueFrom(request);
  }

  deleteCategory(id: string) {
    const request = this.http.delete<Category>(`api/categories/${id}`);

    
    return lastValueFrom(request);
  }
  
}