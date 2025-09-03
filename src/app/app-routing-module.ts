import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './components/products/products';
import {HomeComponent} from './components/home/home';
import {ProductAddComponent} from './components/product-add/product-add';
import {ProductEditComponent} from './components/product-edit/product-edit';
import {CustomersComponent} from './components/customers/customers';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "newProduct", component: ProductAddComponent},
  {path: "products", component: ProductsComponent},
  {path: "customers", component: CustomersComponent},
  {path: "editProduct/:id", component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
