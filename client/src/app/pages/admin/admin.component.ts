import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../../common/interfaces/category.interface';
import { Balloon_Types, Colors, Makers, Product, Shapes } from '../../../../../common/interfaces/product.interface';
import { uniq, omit } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { DeleteConfirmationComponent } from 'src/app/modules/delete-confirmation/delete-confirmation.component';
import { map, startWith } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newCategoryForm: FormGroup;
  categories: Category[];
  makers = Makers;
  shapes = Shapes;
  balloonTypes = Balloon_Types;
  colors = Colors;
  editingProduct: Product;

  filteredColorOptions: string[];
  filteredShapeOptions: string[];
  filteredBalloonTypeOptions: string[];
  filteredMakerOptions: string[];


  newProductForm: FormGroup;
  productFormInitialValues: Product;

  products: Product[];
  categoryDisplayedColumns = ['parent', 'child', 'actions'];
  productDisplayedColumns = ['title', 'description', 'code', 'price', 'pieces', 'sizeCm', 'widthCm', 'heightCm', 'category', 'subCategory', 'color', 'shape', 'type', 'maker', 'soldOut', 'actions1', 'actions2'];


  categoryOptions = [];
  subcategoryOptions = [];


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {

    this.initForm();
    this.loadCategories();
    this.loadProducts();

  }


  async ngOnInit() {
    this.initColorsAutocomplete();
    this.initShapesAutoComplete();
    this.initBalloonTypesAutoComplete();
    this.initMakersAutoComplete();
  }

  initColorsAutocomplete() {

    this.newProductForm.controls.color.valueChanges
      .pipe(startWith(''))
      .subscribe((typedColor: string) => {
        const lowerCaseTyped = typedColor.toLowerCase();

        this.filteredColorOptions = this.colors.filter(color => {
          return color.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initShapesAutoComplete() {

    this.newProductForm.controls.shape.valueChanges
      .pipe(startWith(''))
      .subscribe((typedShape: string) => {
        const lowerCaseTyped = typedShape.toLowerCase();

        this.filteredShapeOptions = this.shapes.filter(shape => {
          return shape.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initBalloonTypesAutoComplete() {
    this.newProductForm.controls.type.valueChanges
      .pipe(startWith(''))
      .subscribe((typedBalloonType: string) => {
        const lowerCaseTyped = typedBalloonType.toLowerCase();

        this.filteredBalloonTypeOptions = this.balloonTypes.filter(balloonType => {
          return balloonType.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initMakersAutoComplete() {
    this.newProductForm.controls.maker.valueChanges
      .pipe(startWith(''))
      .subscribe((typedMaker: string) => {
        const lowerCaseTyped = typedMaker.toLowerCase();

        this.filteredMakerOptions = this.makers.filter(maker => {
          return maker.toLowerCase().includes(lowerCaseTyped);
        });
      });
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
      color: ['', []],
      shape: ['', []],
      type: ['', []],
      maker: ['', []],
      soldOut: [false, []]
    });

    this.productFormInitialValues = this.newProductForm.value;
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

  clickedDeleteCategory(id: string) {
    const confirmation = this.dialog.open(DeleteConfirmationComponent);

    confirmation.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(id);
      }
    });
  }

  private async deleteCategory(id: string) {
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
      color: this.newProductForm.value.color,
      shape: this.newProductForm.value.shape,
      type: this.newProductForm.value.type,
      maker: this.newProductForm.value.maker,
      soldOut: this.newProductForm.value.soldOut
    };


    await this.productService.addProduct(product as Product);
    this.loadProducts();

    this.newProductForm.setValue(this.productFormInitialValues);
  }



  async clickedEditProduct(product: Product) {
    this.editingProduct = product;

    this.newProductForm.patchValue({
      ...omit(product, '_id'),
      category: product.category.parent,
      subCategory: product.category.child
      
    })
  }
  
  async clickedSaveProduct(product: Product) {
    // await this.productService.editProduct(product);
    await this.productService.addProduct(product as Product);

    
    this.loadProducts();
    this.newProductForm.setValue(this.productFormInitialValues);

  }

  async clickedDeleteProduct(id: string) {
    await this.productService.deleteProduct(id);
    this.loadProducts();
  }



}
