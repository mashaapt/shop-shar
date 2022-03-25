import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteConfirmModuleRoutingModule } from './delete-confirm-module-routing.module';
import { DeleteConfirmModuleComponent } from './delete-confirm-module.component';


@NgModule({
  declarations: [
    DeleteConfirmModuleComponent
  ],
  imports: [
    CommonModule,
    DeleteConfirmModuleRoutingModule
  ]
})
export class DeleteConfirmModuleModule { }
