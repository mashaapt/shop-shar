import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../../../common/models/category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  newCategoryForm: FormGroup;
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder) {

    this.initForm();
    this.loadCategories();
  }

  async ngOnInit() {


  }

  private async loadCategories() {
    this.categories = await this.categoryService.getAllCategories();
  }

  private initForm() {
    this.newCategoryForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]]
    });
  }

  async clickedAddCategory() {
    const category: Category = {
      parent: this.newCategoryForm.value.category,
      child: this.newCategoryForm.value.subCategory
    }

    await this.categoryService.addCategory(category);
    this.loadCategories();

    this.newCategoryForm.controls.category.setValue('');
  }

   async clickedDeleteCategory(id: string) {
    await this.categoryService.deleteCategory(id);
    this.loadCategories();
   }
  
}
