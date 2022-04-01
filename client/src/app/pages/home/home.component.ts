import { Component, OnInit } from '@angular/core';

import { Balloon_Types, Colors, Maker, Makers, Product, Shapes } from '../../../../../common/interfaces/product.interface';
import { uniq, omit } from 'lodash';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../common/interfaces/category.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[];
  categoryParents: string[] = [];


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

    console.log(this.categoryParents)

  }

}
