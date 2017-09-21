import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { Product, Category } from '../../model/ecommerce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as Constant from '../../environment';

declare var gtag: Function;
  
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

    productsList: FirebaseListObservable<Product[]> = null; //  list of products

    products: any[];
    productsProvider: ProductsProvider;
    prod: Product = new Product();

    offset = 2;
    nextKey: any; // for next button
    prevKeys: any[] = []; // for prev button
    subscription: any;


    page: number;
    category: Category;

    constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
        this.page = 1;
        this.category = navParams.get("category");

        this.productsProvider = new ProductsProvider(db);
        this.productsList = this.productsProvider.getMainProductsList();
        //this.productsList = this.productsProvider.getProductsListByCategory(this.category);
  }

    ionViewWillEnter() {
        console.log('ionViewWillEnter MenuPage');
        gtag('config', Constant.GA_TRACKING_ID, {
            'page_title': 'Category - ' + this.category.name,
            'page_location': 'https://www.comparegenius.com/category/' + this.category.urlName,
            'page_path': '/category/' + this.category.urlName
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
      this.navCtrl.push('ProductDetails', { "product": product });
  }
}
