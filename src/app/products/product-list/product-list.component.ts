import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subscription} from 'rxjs';

import {Product} from '../product';
import {ProductService} from '../product.service';
import {Store, select} from '@ngrx/store';
import {getCurrentProduct, getShowProductCode, ProductState} from '../state/product.reducer';
import {State} from '../../state/app.state';
import * as productActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State>,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

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

  ngOnDestroy(): void {
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
}
