import { ProductActionsTypes } from './../../../state/product.state';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  // @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  @Input() products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  /*
  onEditProduct(product: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.EDIT_PRODUCT,
      payload: product
    });
  }

  onDeleteProduct(product: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.DELETE_PRODUCT,
      payload: product
    })
  }

  onSelectProduct(product: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionsTypes.SELECT_PRODUCT,
      payload: product
    })
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
  */

}
