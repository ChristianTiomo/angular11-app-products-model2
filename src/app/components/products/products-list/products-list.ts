import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../../model/product.model';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../../state/product.state';
import {ProductsService} from '../../../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsListComponent implements OnInit{

 @Input() productsList$!:Observable<AppDataState<ProductModel[]>>;

  @Output() productsListEventEmitter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();
  readonly DataStateEnum=DataStateEnum;

  columns=["ID","Name","Price","Quantity","Selected","Available"];

  index= ["id","name","price","quantity","selected","available"];


  constructor(private productsService: ProductsService,
              private router: Router) {}

  ngOnInit(): void {}
  products$: any;

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
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
    this.router.navigateByUrl("/products")
  }

  onUpdateProduct(p: ProductModel){
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEventItem($event: ActionEvent){
    console.log($event);
    switch($event.type){
      //case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload); break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelectProduct($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onUpdateProduct($event.payload); break;
    }
  }
}
