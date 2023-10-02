import { EventDriverService } from './../../state/event.driver.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private productsService: ProductsService,
    private eventDriverService: EventDriverService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required],
    });
  }

  onSaveProduct() {
    this.productsService.saveProduct(this.productFormGroup?.value)
    .subscribe(data=> {
      this.eventDriverService.publishEvent({
        type: ProductActionsTypes.PRODUCT_ADDED
      });
      alert(`The product ${data.name} is created successfully !`);
    })
  };

}
