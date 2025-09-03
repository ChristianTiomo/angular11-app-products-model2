import {Component, OnInit} from '@angular/core';
import {HomeComponent} from '../home/home';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class CustomersComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {}

}
