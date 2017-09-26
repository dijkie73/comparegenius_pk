import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { CategoriesProvider } from '../../providers/categories/categories';
import { Category } from '../../model/ecommerce';
import { FirebaseListObservable } from 'angularfire2/database';
import * as Constant from '../../environment';

declare var gtag: Function;

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
    homePage: any;
    categoryList$: FirebaseListObservable<Category[]> = null; //  observable list of categories

    @ViewChild('content') childNavCtrl: NavController;

    constructor(
        private categoryProvider: CategoriesProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {

        this.homePage = HomePage;
        this.categoryList$ = this.categoryProvider.getMainCategoriesList();
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

  openHomePage() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      //this.childNavCtrl.push('product-list');
      this.childNavCtrl.setRoot(this.homePage);
  }

}
