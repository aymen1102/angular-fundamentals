import { Observable, catchError, map, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService : ProductsService,
    private router: Router
  ) {}

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
