import { EventDriverService } from './../../../../state/event.driver.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product?: Product;
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor(private eventDriverService: EventDriverService) {}

  onEditProduct(product: Product) {
    // this.eventEmitter.emit({ type: ProductActionsTypes.EDIT_PRODUCT, payload: product  });
    this.eventDriverService.publishEvent({
      type: ProductActionsTypes.EDIT_PRODUCT, 
      payload: product 
    });
  }

  onDeleteProduct(product: Product) {
    // this.eventEmitter.emit({ type: ProductActionsTypes.DELETE_PRODUCT, payload: product });
    this.eventDriverService.publishEvent({
      type: ProductActionsTypes.DELETE_PRODUCT, 
      payload: product 
    });
  }

  onSelectProduct(product: Product) {
    // this.eventEmitter.emit({ type: ProductActionsTypes.SELECT_PRODUCT, payload: product });
    this.eventDriverService.publishEvent({
      type: ProductActionsTypes.SELECT_PRODUCT, 
      payload: product
    });
  }

}
