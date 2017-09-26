import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as Constant from '../../environment';

import { FirebaseListObservable } from 'angularfire2/database';
import { ProductsProvider } from '../../providers/products/products';
import { ProductDetailsPage } from '../product-details/product-details';
import { Product } from '../../model/ecommerce';

declare var gtag: Function;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productsList$: FirebaseListObservable<Product[]> = null; //  list of products

  @ViewChild('productSlides') productSlides: Slides;

  constructor(private productsProvider: ProductsProvider, public navCtrl: NavController) {
      this.productsList$ = this.productsProvider.getMainProductsList();
      console.log('productlist$');
      console.log(this.productsList$);
  }

  ionViewWillEnter() {
      var pagePath: string = '/';

      gtag('config', Constant.GA_TRACKING_ID, {
          'page_title': 'Home',
          'page_location': Constant.BASE_PATH + pagePath,
          'page_path': pagePath
      });

      console.log('page_location:' + Constant.BASE_PATH + pagePath);
      console.log('page_path:' + pagePath);
      console.log('page_title:' + 'Home');
  }

  // Fired only when a view is stored in memory.
  // This event is NOT fired on entering a view that is already cached.It’s a nice place for init related tasks.
  ionViewDidLoad() {
      setInterval(() => {

          if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
              this.productSlides.slideTo(0);
          else
              this.productSlides.slideNext();
      }, 3000);
  }

  openProductPage(product) {
      this.navCtrl.push(ProductDetailsPage, { "product": product });
  }

}
