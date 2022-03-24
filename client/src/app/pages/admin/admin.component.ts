import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from '../../../../../common/interfaces/category.interface';
import { Product } from '../../../../../common/interfaces/product.interface';
import { uniq } from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newCategoryForm: FormGroup;
  categories: Category[];
  newProductForm: FormGroup;
  products: Product[];
  categoryDisplayedColumns = ['parent', 'child', 'actions'];
  productDisplayedColumns = ['title', 'description', 'code', 'price', 'pieces', 'sizeCm', 'widthCm', 'heightCm', 'category', 'subCategory', 'soldOut', 'actions'];


  categoryOptions = [];
  subcategoryOptions = [];


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder) {

    this.initForm();
    this.loadCategories();
    this.loadProducts();
  }

  async ngOnInit() {


  }

  private async loadCategories() {
    this.categories = await this.categoryService.getAllCategories();
    this.categoryOptions = uniq(this.categories.map(category => category.parent.trim()));
    this.subcategoryOptions = uniq(this.categories.map(category => category.child.trim()));
  }

  private async loadProducts() {
    this.products = await this.productService.getAllProducts();
  }

  private initForm() {
    this.newCategoryForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]]
    });

    this.newProductForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      price: ['', [Validators.required]],
      pieces: [1, [Validators.required]],
      sizeCm: ['', []],
      widthCm: ['', []],
      heightCm: ['', []],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      soldOut: [false, []]
    });
  }

  async clickedAddCategory() {
    const category: Category = {
      parent: this.newCategoryForm.value.category,
      child: this.newCategoryForm.value.subCategory
    };

    await this.categoryService.addCategory(category);
    this.loadCategories();

    this.newCategoryForm.reset();
  }

  async clickedDeleteCategory(id: string) {
    await this.categoryService.deleteCategory(id);
    this.loadCategories();
  }

  async clickedAddProduct() {
    const product: Partial<Product> = {
      title: this.newProductForm.value.title,
      description: this.newProductForm.value.description,
      code: this.newProductForm.value.code,
      price: this.newProductForm.value.price,
      pieces: this.newProductForm.value.pieces,
      sizeCm: this.newProductForm.value.sizeCm,
      widthCm: this.newProductForm.value.widthCm,
      heightCm: this.newProductForm.value.heightCm,
      category: {
        parent: this.newProductForm.value.category,
        child: this.newProductForm.value.subCategory
      },
      soldOut: this.newProductForm.value.soldOut
    };

    await this.productService.addProduct(product as Product);
    this.loadProducts();

    this.newProductForm.reset();
  }

  async clickedDeleteProduct(id: string) {
    await this.productService.deleteProduct(id);
    this.loadProducts();
  }

}
