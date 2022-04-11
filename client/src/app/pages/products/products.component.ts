import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { faCartShopping } from '@fortawesome/pro-regular-svg-icons';
import { uniq, omit } from 'lodash';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../common/interfaces/category.interface';

export interface CatResult {
  category: string;
  children: string[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;

  categories: Category[];
  categoryParents: string[] = [];
  categoryChildren: string[] = [];

  constructor(
    private categoryService: CategoryService
  ) {
    this.loadCategories();
  }

  ngOnInit(): void {
  }


  async loadCategories() {
    this.categories = await this.categoryService.getAllCategories();

    this.categoryParents = uniq(this.categories.map(category => category.parent));
    this.categoryChildren = uniq(this.categories.map(category => category.child));

    const results: CatResult[] = new Array();
    
    this.categories.forEach((cat) => {

      const result = results.find(result => result.category === cat.parent);

      if (!result) {
        results.push({
          category: cat.parent,
          children: [
            cat.child
          ]
        })
      } else {
        result.children.push(cat.child);
      }

      
    })

    console.log(results);

  }
}

