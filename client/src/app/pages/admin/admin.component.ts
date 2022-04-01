import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../../../../common/interfaces/category.interface';
import { Balloon_Types, Colors, Maker, Makers, Product, Shapes } from '../../../../../common/interfaces/product.interface';
import { uniq, omit } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { DeleteConfirmationComponent } from 'src/app/modules/delete-confirmation/delete-confirmation.component';
import { map, startWith, Subject } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newCategoryForm: FormGroup; //keeps the values from the inputs in the category form
  newProductForm: FormGroup;  //keeps the values from the inputs in the product form
  
  //the initial empty form with properties of the Product interface
  productFormInitialValues: Product; 
  
  //list of category objects retrieved from the db using the category service
  //used as the [dataSource] for the categories grid(table)
  //this property is set when the AdminComponent loads
  categories: Category[];

  //list of product objects retrieved from the db using the product service
  //use as the [dataSource] for the categories grid(table)
  //this property is set when the AdminComponent loads
  products: Product[];

  //the id of the product currently being edited.
  //when we click 'Изменить' we set this property to the id of product we clicked
  //when we click 'Отменить' we set this property to 'null'
  editingProductId: string;

  //options for autocomplete dropdowns after filtering, using a search term from the input(when you write smth)
  filteredColorOptions: string[];
  filteredShapeOptions: string[];
  filteredBalloonTypeOptions: string[];
  filteredMakerOptions: string[];

  //list of property keys from the category object for which columns will be displayed in the categories table
  categoryDisplayedColumns = ['parent', 'child', 'actions'];
  //list of property keys from te product object for which columns will be displayed in the products table
  productDisplayedColumns = ['title', 'description', 'code', 'price', 'pieces', 'sizeCm', 'widthCm', 'heightCm', 'category', 'subCategory', 'color', 'shape', 'type', 'maker', 'soldOut', 'actions1', 'actions2'];

  //list of categories used in the category dropdown in the product form
  //set to unique values of the 'parent' properties from the categories retrieved from the db
  categoryOptions: string[] = [];

  //list of subcategories used in the subcategory dropdown in the product form
  //set to unique values of the 'child' properties from the categories retrieved from the db
  subcategoryOptions = [];


  constructor(

    ///ALL CONSTRUCTOR PARAMETERS ARE INJECTED BY ANGULAR BASED ON THE TYPE
    //used to make http requests to the category API on the server to add/delete/edit categories
    private categoryService: CategoryService,

    //used to make http requests to the product API on the server to add/delete/edit products
    private productService: ProductService,

    //angular service used to create formgroups with less code
    private formBuilder: FormBuilder,

    //angular material service used to open dialogs
    //used by us to show a confirmation popup before deleting a category
    private dialog: MatDialog) {




    //used to initialize a product and category FormGroup(s) using the FormBuilder service
    //also used to record the initial state of the product form for later resetting
    this.initForm();

    //loads the categories from the db using the CategoryService
    //sets the unique values used in the category dropdowns in the product form
    this.loadCategories();

    //loads the products from the db using the ProductService
    this.loadProducts();

  }


  async ngOnInit() {
    this.initColorsAutocomplete();
    this.initShapesAutoComplete();
    this.initBalloonTypesAutoComplete();
    this.initMakersAutoComplete();
  }

  initColorsAutocomplete() {

    //valueChanges is an Observable which emits when the value of the color FormControl changes
    //this happens when the user types into the input connected to this Formcontrol
    this.newProductForm.controls.color.valueChanges
      .pipe(startWith('')) //causes the Observable to emit an initial value(empty string)
      .subscribe((typedColor: string) => {
        const lowerCaseTyped = typedColor.toLowerCase();

        //filter the colors based on the typed search term
        //we lowercase both the search term and the color so that it's not case-sensitive
        this.filteredColorOptions = Colors.filter(color => {
          return color.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initShapesAutoComplete() {

    //valueChanges is an Observable which emits when the value of the shape FormControl changes
    //this happens when the user types into the input connected to this FormControl
    this.newProductForm.controls.shape.valueChanges
      .pipe(startWith('')) //causes the Observable to emit an initial value(empty string)
      .subscribe((typedShape: string) => {
        const lowerCaseTyped = typedShape.toLowerCase();

        //filter the shapes based on the typed search term
        //we lowercase both the search term and the shape so that it's not case-sensitive
        this.filteredShapeOptions = Shapes.filter(shape => {
          return shape.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initBalloonTypesAutoComplete() {

    //valueChanges is an Observable which emits when the value of the balloon type FormControl changes
    //this happens when the user types into the input connected to this FormControl
    this.newProductForm.controls.type.valueChanges
      .pipe(startWith('')) //causes the Observable to emit an initial value(empty string)
      .subscribe((typedBalloonType: string) => {
        const lowerCaseTyped = typedBalloonType.toLowerCase();

        //filter the balloon types based on the typed search term
        //we lowercase both the search term and the balloon type so that it's not case-sensitive
        this.filteredBalloonTypeOptions = Balloon_Types.filter(balloonType => {
          return balloonType.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  initMakersAutoComplete() {

    //valueChanges is an Observable which emits when the value of the maker FormControl changes
    //this happens when the user types into the input connected to this FormControl
    this.newProductForm.controls.maker.valueChanges
      .pipe(startWith('')) //causes the Observable to emit an initial value(empty string)
      .subscribe((typedMaker: string) => {
        const lowerCaseTyped = typedMaker.toLowerCase();

        //filter the makers based on the typed search term
        //we lowercase both, the search term and the maker so that it's not case-sensitive
        this.filteredMakerOptions = Makers.filter(maker => {
          return maker.toLowerCase().includes(lowerCaseTyped);
        });
      });
  }

  private async loadCategories() {
    //we use the CategoryService to retrieve categories from the database via the API
    this.categories = await this.categoryService.getAllCategories();

    //set to unique values of the 'parent' properties from the categories retrieved from the db
    //we use the uniq method to remove duplicates from our list of categories
    //trim takes away the white space
    this.categoryOptions = uniq(this.categories.map(category => category.parent.trim()));
    this.subcategoryOptions = uniq(this.categories.map(category => category.child.trim()));
  }

  private async loadProducts() {
    this.products = await this.productService.getAllProducts();
    //we use the ProductService to retrieve products from the db via the API
  }

  private initForm() {

    //used to initialize a category FormGroup using the FormBuilder service
    this.newCategoryForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]]
    });

    //used to initialize a product FormGroup using the FormBuilder service
    this.newProductForm = this.formBuilder.group({
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

    //we take this newProducForm as an initial form that we can use later to get to the initial empty form of products
    this.productFormInitialValues = this.newProductForm.value;
  }

  async clickedAddCategory() {
    //create a category object from the values in the form
    //(the FormGroup contains the values in the inputs)
    const category: Category = {
      parent: this.newCategoryForm.value.category.trim(),
      child: this.newCategoryForm.value.subCategory.trim()
    };

    //call the CategoryService to add the category to the database using the API
    await this.categoryService.addCategory(category);

    //reload all the categories to see the new category we added
    this.loadCategories();

    //we make our form empty again that we could write new one
    this.newCategoryForm.reset();
  }

  //this method gets called when we click the delete button
  clickedDeleteCategory(id: string) {
    //use the material MatDialog service to open the confirmation component in a popup (asking "Are you sure?")
    const confirmation = this.dialog.open(DeleteConfirmationComponent);

    //afterClosed() returns an Observable that triggers when the popup is closed
    confirmation.afterClosed().subscribe(result => {

      //the result will be the value we pass to the [mat-dialog-close] input in delete-confirmation.component.html
      if (result) {
        //after confirmation we delete one of the categories
        this.deleteCategory(id);
      }
    });
  }

  private async deleteCategory(id: string) {
    //we delete it by id (one) from the database using the API
    await this.categoryService.deleteCategory(id);

    //after deleting the category, we reload all categories to see the category disappear from the UI
    this.loadCategories();
  }

  async clickedAddProduct() {
    const product = this.makeProductFromForm();

    //call the CategoryService to add the product to the database using the API
    await this.productService.addProduct(product);

    //reload all the categories to see the new category we added
    this.loadProducts();

    //then we set the initial value so there is an empty form again
    this.newProductForm.setValue(this.productFormInitialValues);
  }


  makeProductFromForm() {
    //create a product object from the values in the form
    //(the FormGroup(newProductForm) contains the values in the inputs)
    const product: Product = {
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

    return product;
  }


  clickedEditProduct(product: Product) {

    //'product' is one of the products from the list that you clicked edit button on
    //here we set 'editingProductId' to the id of product that we clicked
    this.editingProductId = product._id;


    //'patchValue()' updates the values of controls for every property in the object provided
    this.newProductForm.patchValue({

      //the 'omit' function removes the specified properties from the object(_id), (returns a new object without those properties)
      //we need to omit the '_id' because there is no control for '_id' in the FormGroup
      //all the rest of the properties on 'product' can be used to update their respective controls
      ...omit(product, '_id'),

      //update the category and subCategory control values on the form
      category: product.category.parent,
      subCategory: product.category.child

    })
  }

  async clickedSaveProduct() {

    //create a product from the form values (in the inputs)
    const product = this.makeProductFromForm();

    //we need to add the _id property so that it will be sent to the server, and the database can update by id
    product._id = this.editingProductId;

    //we pass the edited product (with the updated values) to the API for it to be saved in the database
    await this.productService.editProduct(product);

    //when done editing, setting this to null will cause the Save and Cancel buttons to disappear (because of *ngIf on this property)
    this.editingProductId = null;

    //reload all the products to see that the changed product has been saved
    this.loadProducts();

    //return the product form to its initial state (initial state set in initForm() )
    this.newProductForm.reset(this.productFormInitialValues);

  }

  clickedCancel() {

    //we cancel our edit by the reset, so there is the initial state of the form (empty)
    this.newProductForm.reset(this.productFormInitialValues);

    //when done editing, setting this to null will cause the Save and Cancel buttons to disappear (because of *ngIf on this property)
    this.editingProductId = null;
  }

  async clickedDeleteProduct(id: string) {

    //we delete one of the products by id(one) through the api to the db
    await this.productService.deleteProduct(id);

    //reload the list of products(without one of the products)
    this.loadProducts();
  }



}
