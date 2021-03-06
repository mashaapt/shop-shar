import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import { faCartShopping } from '@fortawesome/pro-regular-svg-icons';
import { uniq, omit } from 'lodash';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../common/interfaces/category.interface';
import { Product } from '../../../../../common/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';

export interface CatResult {
  category: string;
  children: string[];
}

const result: CatResult = null;




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;
  faCartShopping = faCartShopping;
  faHeart = faHeart;

  nestedCats: CatResult[] = [];
  activeCatResult: CatResult;
  activeSubcategory: string;

  categories: Category[];
  categoryParents: string[] = [];
  categoryChildren: string[] = [];
  products: Product[] = [];
  
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.loadCategories();
    this.loadProducts();
  }

  ngOnInit(): void {
  }


  async loadCategories() {
    this.categories = await this.categoryService.getAllCategories();

    this.categoryParents = uniq(this.categories.map(category => category.parent));
    this.categoryChildren = uniq(this.categories.map(category => category.child));

    this.categories.forEach((cat) => {

      const result = this.nestedCats.find(result => {
        return result.category === cat.parent
      });

      if (!result) {
        this.nestedCats.push({
          category: cat.parent,
          children: [
            cat.child
          ]
        })
      } else {
        result.children.push(cat.child);
      }


    })
  }

  async loadProducts() {
    this.products = await this.productService.getAllProducts();
  }

  clickedActiveCatResult(cat: CatResult) {
    this.activeCatResult = cat;
  }

  clickedActiveSubcatResult(subcat: string) {
    this.activeSubcategory = subcat;
  }

  productsAppeared(product: Product[]) {
    
  }
}

