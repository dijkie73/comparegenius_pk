import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product, Category } from '../../model/ecommerce';
import * as Constant from '../../environment';

declare var gtag: Function;

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.product = this.navParams.get('product');
      console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  ionViewWillEnter() {
      console.log('ionViewWillEnter MenuPage');
      gtag('config', Constant.GA_TRACKING_ID, {
          'page_title': this.product.title,
          'page_location': 'https://www.comparegenius.com/' + this.product.urlName,
          'page_path': this.product.urlName
      });
      console.log('page_location: https://www.comparegenius.com/' + this.product.urlName);
      console.log('page_path:' + this.product.urlName);
  }

  openURL(externalURL, store) {
      gtag('config', Constant.GA_TRACKING_ID, {
          'custom_map': { 'dimension1': 'affiliation' }
      });

      console.log('affiliation: ' + store);

    gtag('event', 'click', {
        'event_category': 'affiliate',
        'event_label': externalURL,
        'transport_type': 'beacon',
        'affiliation': store,
        'currency': 'PKR',
        'items': [
            {
                'brand': 'Samsung',
                'category': 'Mobile Phones',
                'price': '59,200',
                'name': 'Samsung Galaxy S7 edge',
                'variant': 'Black - 32GB'
            }
        ],
        'event_callback': function () { window.open(externalURL); }
    });
  }

}
