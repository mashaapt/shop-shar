import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../../common/interfaces/category.interface';
import { Balloon_Types, Colors, Maker, Makers, Product, Shapes } from '../../../../../common/interfaces/product.interface';
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
  makers = Makers; //this is string array used in the autocomplete for products
  shapes = Shapes; //this is string array used in the autocomplete for products
  balloonTypes = Balloon_Types; //this is string array used in the autocomplete for products
  colors = Colors; //this is string array used in the autocomplete for products
  editingProduct: Product; //prop that keeps the list htat is on the Product interface

  filteredColorOptions: string[]; //option that you might choose in the dropdown
  filteredShapeOptions: string[]; //option that you might choose in the dropdown
  filteredBalloonTypeOptions: string[]; //option that you might choose in the dropdown
  filteredMakerOptions: string[]; //option that you might choose in the dropdown


  newProductForm: FormGroup; //new tthings that you put in the empty form
  productFormInitialValues: Product; //the initial empty for with properties of the Product interface

  products: Product[]; //prop that keeps array of products
  categoryDisplayedColumns = ['parent', 'child', 'actions'];
  productDisplayedColumns = ['title', 'description', 'code', 'price', 'pieces', 'sizeCm', 'widthCm', 'heightCm', 'category', 'subCategory', 'color', 'shape', 'type', 'maker', 'soldOut', 'actions1', 'actions2'];
  //props that should be in columns

  categoryOptions = []; //options of cateogries in the dropdown
  subcategoryOptions = []; //options of subcateogries in the dropdown


  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {

    this.initForm();
    this.loadCategories(); //for loading categories from db
    this.loadProducts(); //for loading products from db

  }


  async ngOnInit() {
    this.initColorsAutocomplete();
    this.initShapesAutoComplete();
    this.initBalloonTypesAutoComplete();
    this.initMakersAutoComplete();
  }

  initColorsAutocomplete() {

    this.newProductForm.controls.color.valueChanges //in our form we take formControlName 'color' from the controls and set valueChanges to watch if you write smth or not
      .pipe(startWith('')) //the middleware that set startWith func that even with the empty space in the input there will be seen the options in the dropdown
      .subscribe((typedColor: string) => {
        const lowerCaseTyped = typedColor.toLowerCase();

        this.filteredColorOptions = this.colors.filter(color => {
          return color.toLowerCase().includes(lowerCaseTyped);
        }); //when you type smth in upper or lower case the items from the options will be shown if there are those typed letters
      });
  }

  initShapesAutoComplete() {

    this.newProductForm.controls.shape.valueChanges //in our form we take formControlName 'shape' from the controls and set valueChanges to watch if you write smth or not
      .pipe(startWith('')) //the middleware that set startWith func that even with the empty space in the input there will be seen the options in the dropdown
      .subscribe((typedShape: string) => {
        const lowerCaseTyped = typedShape.toLowerCase();

        this.filteredShapeOptions = this.shapes.filter(shape => {
          return shape.toLowerCase().includes(lowerCaseTyped);
        }); //when you type smth in upper or lower case the items from the options will be shown if there are those typed letters
      });
  }

  initBalloonTypesAutoComplete() {
    this.newProductForm.controls.type.valueChanges //in our form we take formControlName 'type' from the controls and set valueChanges to watch if you write smth or not
      .pipe(startWith('')) //the middleware that set startWith func that even with the empty space in the input there will be seen the options in the dropdown
      .subscribe((typedBalloonType: string) => {
        const lowerCaseTyped = typedBalloonType.toLowerCase();

        this.filteredBalloonTypeOptions = this.balloonTypes.filter(balloonType => {
          return balloonType.toLowerCase().includes(lowerCaseTyped);
        }); //when you type smth in upper or lower case the items from the options will be shown if there are those typed letters
      });
  }

  initMakersAutoComplete() {
    this.newProductForm.controls.maker.valueChanges //in our form we take formControlName 'maker' from the controls and set valueChanges to watch if you write smth or not
      .pipe(startWith('')) //the middleware that set startWith func that even with the empty space in the input there will be seen the options in the dropdown
      .subscribe((typedMaker: string) => {
        const lowerCaseTyped = typedMaker.toLowerCase();

        this.filteredMakerOptions = this.makers.filter(maker => {
          return maker.toLowerCase().includes(lowerCaseTyped);
        }); //when you type smth in upper or lower case the items from the options will be shown if there are those typed letters
      });
  }

  private async loadCategories() {
    this.categories = await this.categoryService.getAllCategories(); //we use get func to take categories by the api from the db
    this.categoryOptions = uniq(this.categories.map(category => category.parent.trim())); //we use uniq  method that there werent any repeats in or list of categories
    this.subcategoryOptions = uniq(this.categories.map(category => category.child.trim())); //we use uniq  method that there werent any repeats in or list of subcategories
  }                                                                                        //trim takes away the white space

  private async loadProducts() {
    this.products = await this.productService.getAllProducts(); //we use get func to take products by the api from the db
  }

  private initForm() {
    this.newCategoryForm = this.formBuilder.group({ //we initialize form of cat and subcat for the first page where we add just them
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]]
    });

    this.newProductForm = this.formBuilder.group({ //we initialize form of products' properties for the second page where we can add new products
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      price: ['', [Validators.required]],
      pieces: [1, []],
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

    this.productFormInitialValues = this.newProductForm.value; //we take this newProducForm as an initial form that we can use later to get to the initial empty form of products
  }

  async clickedAddCategory() {
    const category: Category = { //we take cat/subcat 's values from Category interface and put them in var category
      parent: this.newCategoryForm.value.category,
      child: this.newCategoryForm.value.subCategory
    };

    await this.categoryService.addCategory(category); //we take that var and if there any cahnges for adding something new we add it through api to the db
    this.loadCategories(); //to see the list after all

    this.newCategoryForm.reset(); //we make our form empty again that we could write new one
  }

  clickedDeleteCategory(id: string) {
    const confirmation = this.dialog.open(DeleteConfirmationComponent); //when we click delete btn we open with this method the dialog of confirmatino that asks if you're sure

    confirmation.afterClosed().subscribe(result => {  //subscribe bind our decision with the result, so if there is delete deciision result then the cat will be deleted
      if (result) {
        this.deleteCategory(id); //we delete it by id so there is only one that we delete
      }
    });
  }

  private async deleteCategory(id: string) {
    await this.categoryService.deleteCategory(id); //we delete it by id (one) from our api and then fron the db
    this.loadCategories(); //to see the list after all
  }

  async clickedAddProduct() {
    const product = this.makeProductFromForm();
    await this.productService.addProduct(product); //we take product from our form and add it throught the api to the db
    this.loadProducts(); //to see the list after all

    this.newProductForm.setValue(this.productFormInitialValues); //then we set the initiaal value so there is an empty form again
  }

  makeProductFromForm() { //we made new form from the old one that takes all props from the Product interface
    const product: Partial<Product> = { //so we can use this var to return values for every property
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

    return product as Product; //it will  return the product due to Product interface
  }

  clickedEditProduct(product: Product) {
    this.editingProduct = product; //eddting product is one of the prducts from the list that you edit due to all the properties from the Product interface

    this.newProductForm.patchValue({ //we patch(get) cat and subcat for the new form after clicking but we omit(delete) the id cause they inextricable(неразрывные)
      ...omit(product, '_id'),
      category: product.category.parent,
      subCategory: product.category.child

    })
  }

  async clickedSaveProduct() {
    const product = this.makeProductFromForm(); //we take the same product from the form
    product._id = this.editingProduct._id; //we equal each item of the product to the editing one - so its just item/s that you have edited before
    await this.productService.editProduct(product); //we pass the edited product through the api from the db

    this.editingProduct = null; //after saving it to db, we remove the buttons save and cancel
    this.loadProducts(); //to see the changed item/s in our list after all
    this.newProductForm.reset(this.productFormInitialValues); //we make our form empty again that we could edit or add another one

  }

  clickedCancel() {
    this.newProductForm.reset(this.productFormInitialValues); //we cancel our edit by the reset, so there is the initial state of the form - empty form
    this.editingProduct = null; //after canceling the action we remove the buttons save and cancel
  }

  async clickedDeleteProduct(id: string) {
    await this.productService.deleteProduct(id); //we delete one of the product by id(one) through the api to the db
    this.loadProducts(); //to see the list after all(without one of the products)
  }



}
