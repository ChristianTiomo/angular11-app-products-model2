import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductsListComponent} from '../products-list';
import {ProductModel} from '../../../../model/product.model';
import {ActionEvent, ProductActionsTypes} from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItemComponent implements OnInit{

  @Input() product!:ProductModel;
  @Output() productItemEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit() {
  }

  onSelectProduct(product: ProductModel){
    this.productItemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload:product});
  }

  onUpdateProduct(product: ProductModel){
    this.productItemEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload:product});
  }

  onDeleteProduct(product: ProductModel){
    console.log("Delete product")
    this.productItemEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload:product});
  }

}
