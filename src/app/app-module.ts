import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {ProductsComponent} from './components/products/products';
import {NavBarComponent} from './components/nav-bar/nav-bar';
import {ProductsNavBarComponent} from './components/products/products-nav-bar/products-nav-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductsListComponent} from './components/products/products-list/products-list';
import {ProductItemComponent} from './components/products/products-list/product-item/product-item';
import {HomeComponent} from './components/home/home';
import {ProductAddComponent} from './components/product-add/product-add';
import {ProductEditComponent} from './components/product-edit/product-edit';
import {CustomersComponent} from './components/customers/customers';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    ProductsComponent,
    NavBarComponent,
    ProductsNavBarComponent,
    ProductsListComponent,
    ProductItemComponent,
    HomeComponent,
    ProductAddComponent,
    ProductEditComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
