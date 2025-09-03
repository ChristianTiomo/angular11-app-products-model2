import { Component } from '@angular/core';
import {HomeComponent} from '../home/home';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.html',
  styleUrl: './product-add.css'
})
export class ProductAddComponent {
  productFormGroup!: FormGroup;
  submitted:boolean=false;

  constructor(private fb:FormBuilder,
              private productsService:ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:["", Validators.required],
      price:["", Validators.required],
      quantity:["", Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]
    });
  }

  onSaveProduct(){
    this.submitted=true;
    if(this.productFormGroup.invalid) return;
    this.productsService.saveProduct(this.productFormGroup.value)
      .subscribe(data=>{
        alert("success saving product")
        this.router.navigateByUrl("/products")
      });
  }

  onSubmit(){
    alert(JSON.stringify(this.productFormGroup.value));
  }

  cancel() {
    this.router.navigateByUrl("/products")
  }
}
