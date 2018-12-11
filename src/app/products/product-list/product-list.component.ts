import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {select, Store} from '@ngrx/store';
import {getCurrentProduct, getError, getProducts, getShowProductCode} from '../state/product.reducer';
import {State} from '../../state/app.state';
import * as productActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  pageTitle = 'Products';
  displayCode: boolean;
  products: Product[];
  selectedProduct: Product | null;

  constructor(private store: Store<State>,
              private productService: ProductService) {
  }

  ngOnInit(): void {

    this.errorMessage$ = this.store.pipe(select(getError));

    this.store.dispatch(new productActions.Load());

    this.products$ =  this.store.pipe(select(getProducts));


    this.store.pipe(select(getShowProductCode)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode;
      });

    this.store.pipe(select(getCurrentProduct)).subscribe(
      currentProduct => {
        this.selectedProduct = currentProduct;
      }
    );
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  ngOnDestroy(): void {
  }
}
