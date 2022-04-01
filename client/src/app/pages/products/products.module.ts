import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationModule } from 'src/app/modules/navigation/navigation.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FontAwesomeModule,
    NavigationModule
  ]
})
export class ProductsModule { }
