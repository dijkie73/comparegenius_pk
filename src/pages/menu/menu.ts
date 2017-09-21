import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { CategoriesProvider } from '../../providers/categories/categories';
import { Category } from '../../model/ecommerce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as Constant from '../../environment';

declare var gtag: Function;

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

    homePage: any;
    categories: any[];
    categoryProvider: CategoriesProvider;

    categoryList: FirebaseListObservable<Category[]> = null; //  list of categories

    @ViewChild('content') childNavCtrl: NavController;

    constructor(
        public db: AngularFireDatabase,
        public navCtrl: NavController,
        public navParams: NavParams) {

        this.homePage = HomePage;

        this.categories = [];
        this.categoryProvider = new CategoriesProvider(db);

        this.categoryList = this.categoryProvider.getMainCategoriesList();

        console.log(typeof(this.homePage));
        console.log(this.categoryList);
  }
    ionViewWillEnter() {
        console.log('ionViewWillEnter MenuPage');
        gtag('config', Constant.GA_TRACKING_ID, {
            'page_title': 'menupage-menuts-iv-will-enter',
            'page_location': 'https://comparegenius.com/menu',
            'page_path': '/menuenter'
        });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad MenuPage');
      //gtag('event', 'page_view', { 'send_to': Constant.GA_TRACKING_ID });
      //gtag('config', Constant.GA_TRACKING_ID, {
      //    'page_title': 'menupage-menuts',
      //    'page_location': 'https://comparegenius.com/menu',
      //    'page_path': '/menu'
      //});

      //gtag('event', 'screen_view', { 'screen_name': 'MenuScreenName-menuts' });  
      
  }
  openCategoryPage(category) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category});
  }

  openInvolvePage() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.childNavCtrl.push('product-list');
      //this.navCtrl.setRoot(InvolvePage);
  }

}
