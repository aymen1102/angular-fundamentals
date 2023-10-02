import { EventDriverService } from './../../state/event.driver.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup?: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private eventDriverService: EventDriverService
  ) {
    this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productsService.getProductById(this.productId)
      .subscribe(
        product =>
          this.productFormGroup = this.fb.group({
            id: [product.id, Validators.required],
            name: [product.name, Validators.required],
            price: [product.price, Validators.required],
            quantity: [product.quantity, Validators.required],
            selected: [product.selected, Validators.required],
            available: [product.available, Validators.required],
          })
      );
  }

  onEditProduct() {
    this.productsService.updateProduct(this.productFormGroup?.value)
      .subscribe(
        (product) => {
          this.eventDriverService.publishEvent({
            type: ProductActionsTypes.PRODUCT_UPDATED
          });
          alert("Product updated !")
        }
      );
  }

}
