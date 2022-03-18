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

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder) {

    this.initForm();
   }

  ngOnInit(): void {
    

  }

  private initForm() {
    this.newCategoryForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]]
    });
  }

  clickedAddCategory() {
    const category: Category = {
      parent: this.newCategoryForm.value.category,
      child: this.newCategoryForm.value.subCategory
    }

    this.categoryService.addCategory(category);
    this.categoryService.gellAllCategories();
  }

}
