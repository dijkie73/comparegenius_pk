import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from '../../model/ecommerce';
import * as Constant from '../../environment';
import { FirebaseListObservable } from 'angularfire2/database';

import { FeatureGroup } from '../../model/features';
import { FeaturesProvider } from '../../providers/features/features';
//import { HtmlheadProvider } from '../../providers/htmlhead/hitmlhead';

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
    featureGroups: FirebaseListObservable<FeatureGroup[]> = null; //  list of products

    //htmlheadService: HtmlheadProvider = new HtmlheadProvider();

    fg: FeatureGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private featuresProvider: FeaturesProvider) {
      this.product = this.navParams.get('product');

      this.featureGroups = this.featuresProvider.getSortedFeatureGroups();

      this.featuresProvider.getFeatureGroup('-Kuf0Pf37w585VrreopK').subscribe(data => { console.log("Data is : ", data) });
      this.featureGroups.subscribe(data => { console.log("All Data is : ", data) });

      this.fg = new FeatureGroup();
      this.fg.sortNr = 1;

      //this.fg.name = { "en": "Storage", "nl": "Opslag" };
      console.log(this.fg);
      //console.log('loc en: ' + this.fg.getLocalizedName("en"));
      //console.log('loc nl: ' + this.fg.getLocalizedName("nl"));
      //console.log('loc pk: ' + this.fg.getLocalizedName("pk"));

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

      // Try to remove META-Tags
//      this.htmlheadService.clearHead();

      
      // Add the new META-Tags
//      this.htmlheadService.addDescription("Weeklystyle - Die neueste Mode, Musik und Events. Täglich aktualisierte Daten und ausgesuchte Produkte. Viel Spass beim stöbern und träumen.");
//      this.htmlheadService.addKeywords("Mode, Musik, Events");

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
