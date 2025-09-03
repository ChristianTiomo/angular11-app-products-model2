import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProductModel} from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  //host: string = environment.url
  host: string = "http://localhost:3000"

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.host + "/products");
  }
  getSelectedPoducts(): Observable<ProductModel []>{
    //return this.http.get<Products[]>(this.url);
    return this.http.get<ProductModel[]>(this.host+"/products?selected=true");
  }

  getAvailableProducts(): Observable<ProductModel []>{
    //return this.http.get<Products[]>(this.url);
    return this.http.get<ProductModel[]>(this.host+"/products?available=true");
  }

  searchProducts(keyword: string): Observable<ProductModel[]> {
    const params = new HttpParams().set('name_like', (keyword || '').trim());
    return this.http.get<ProductModel[]>(`${this.host}/products`, { params });
  }

  selectProduct(product:ProductModel): Observable<ProductModel>{
    product.selected=!product.selected;
    return this.http.put<ProductModel>(this.host+"/products/"+product.id,product);
  }

  deleteProduct(product:ProductModel): Observable<void>{
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }

  saveProduct(product:ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(this.host+"/products",product);
  }

  getProduct(id:number): Observable<ProductModel>{
    return this.http.get<ProductModel>(this.host+"/products/"+id);
  }

  updateProduct(product:ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(this.host+"/products/"+product.id,product);
  }
}
