import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },

  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule)
  },

  {
    path: 'delivery',
    loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule)
  },

  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
