import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { Product, Category } from '../../model/ecommerce';
import { FirebaseListObservable } from 'angularfire2/database';
import * as Constant from '../../environment';

//import { ProductDetailsPage } from '../product-details/product-details';

//import { FeaturesProvider } from '../../providers/features/features';

declare var gtag: Function;

@IonicPage({})
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

    productsList: FirebaseListObservable<Product[]> = null; //  list of products

    products: any[];
    prod: Product = new Product();

    offset = 2;
    nextKey: any; // for next button
    prevKeys: any[] = []; // for prev button
    subscription: any;


    page: number;
    category: Category;

    constructor(private productsProvider: ProductsProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.page = 1;
        this.category = navParams.get("category");

        this.productsList = this.productsProvider.getMainProductsList();

        //var fprov: FeaturesProvider;

        //fprov = new FeaturesProvider(db);
        //fprov.createFeatureGroups();
        //this.productsList = this.productsProvider.getProductsListByCategory(this.category);
  }

    ionViewWillEnter() {
        console.log('ionViewWillEnter ProductsByCategoryPage');
        console.log(this.category.slug["en-PK"]);
        gtag('config', Constant.GA_TRACKING_ID, {
            'page_title': 'Category - ' + this.category.name["en-PK"],
            'page_location': 'https://www.comparegenius.com/category/' + this.category.slug["en-PK"],
            'page_path': '/category/' + this.category.slug["en-PK"]
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  private getProducts(key?) {
      //this.subscription = this.productsProvider.getLimitedProductList(this.offset, key)
      //    .subscribe(products => {
      //        this.products = _.slice(products, 0, this.offset)
      //        this.nextKey = _.get(products[this.offset], '$key')
      //    })
  }

  loadMoreProducts(event) {
      this.page++;
      this.getProducts(this.nextKey);

      console.log("Getting page " + this.page);

      this.productsList = this.productsProvider.getLimitedProductList(this.offset, this.nextKey);

      //this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      //    let temp = (JSON.parse(data.body).products);

      //    this.products = this.products.concat(JSON.parse(data.body).products)
      //    console.log(this.products);
      //    event.complete();

      //    if (temp.length < this.offset)
      //        event.enable(false);
      //})
  }

  openProductPage(product) {
      this.navCtrl.push('ProductDetailsPage', { "product": product });
  }
}
