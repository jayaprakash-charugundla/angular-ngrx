import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../product';
import {select, Store} from '@ngrx/store';
import {State} from '../../../state/app.state';
import {getCurrentProduct, getError, getProducts, getShowProductCode} from '../../state/index';
import * as productActions from '../../state/product.action';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ =  this.store.pipe(select(getProducts));
    this.errorMessage$ = this.store.pipe(select(getError));
    this.selectedProduct$ = this.store.pipe(select(getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(getShowProductCode));
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
