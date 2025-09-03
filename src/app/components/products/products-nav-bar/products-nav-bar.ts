import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductsListComponent} from '../products-list/products-list';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../model/product.model';
import {ProductsService} from '../../../services/products.service';
import {ProductActionsTypes} from '../../../state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  standalone: false,
  templateUrl: './products-nav-bar.html',
  styleUrl: './products-nav-bar.css'
})
export class ProductsNavBarComponent implements OnInit{

  products!: Observable<ProductModel[]> ;

  @Output() productsEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}


  onGetAllProducts(){
    this.productsEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts(){
    this.productsEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts(){
    this.productsEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct(){
    this.productsEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCT});
  }

  onSearchProducts(dataForm: any){
    this.productsEventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
  }
}
