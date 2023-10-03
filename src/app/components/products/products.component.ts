import { EventDriverService } from './../../state/event.driver.service';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService : ProductsService,
    private eventDriverService : EventDriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onGetAllProducts();
    this.eventDriverService.sourceEventObservable.subscribe((actionEvent: ActionEvent) => {
      this.onActionEvent(actionEvent);
    });
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts(); break;

      case ProductActionsTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProduct(); break;

      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts(); break;

      case ProductActionsTypes.NEW_PRODUCT:
        this.onNewProduct(); break;

      case ProductActionsTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload); break;

      case ProductActionsTypes.DELETE_PRODUCT:
        this.onDeleteProduct($event.payload);  break;

      case ProductActionsTypes.EDIT_PRODUCT:
        this.onEditProduct($event.payload);  break;

      case ProductActionsTypes.SELECT_PRODUCT:
        this.onSelectProduct($event.payload);
    }
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts()
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onGetSelectedProduct() {
    this.products$ = this.productsService.getSelectedProducts()
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvaliableProducts()
      .pipe(
        map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
      );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword)
    .pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelectProduct(product: Product) {
    this.productsService.selectProduct(product).subscribe(
      data => product.selected = data.selected
    );
  }

  onDeleteProduct(product: Product) {
    let v = confirm('Please confirm removing the product ?');
    if (v = true)
    product.selected = !product.selected;
    this.productsService.deleteProduct(product).subscribe(
      data => this.onGetAllProducts()
    );
  }

  onNewProduct() {
    this.router.navigateByUrl("/new-product")
  }

  onEditProduct(product: Product) {
    this.router.navigateByUrl("/edit-product/" + product.id);
  }
 
}
