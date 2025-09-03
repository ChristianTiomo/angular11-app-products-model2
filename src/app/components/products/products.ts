import {Component, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home';
import {ProductsService} from '../../services/products.service';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {ProductModel} from '../../model/product.model';
import {ActionEvent, DataStateEnum, ProductActionsTypes} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit{

  products$!: any

  constructor(private productsService : ProductsService,
              private router : Router) {}

   ngOnInit(): void {}

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedPoducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSearchProducts(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm).pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSelectProduct(p: ProductModel){
    this.productsService.selectProduct(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDeleteProduct(p: ProductModel){
    let v=confirm("Etes vous sure de vouloir supprimer?")
    if(v==true)
      this.productsService.deleteProduct(p)
        .subscribe(data=>{
          this.onGetAllProducts();
        })
  }

  onUpdateProduct(p: ProductModel){
    this.router.navigateByUrl("/updateProduct/"+p.id)
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }

  onActionEvent($event: ActionEvent){
    console.log($event);
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearchProducts($event.payload); break;
    }
  }

  onActionEventList($event: ActionEvent){
    console.log($event);
    switch($event.type){
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelectProduct($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onUpdateProduct($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload); break;
    }
  }
}
