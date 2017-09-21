import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as Constant from '../../environment';

import { CategoriesProvider } from '../../providers/categories/categories';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Category } from '../../model/ecommerce';

declare var gtag: Function;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  categories: FirebaseListObservable<Category[]>;

  constructor(private categoryProvider: CategoriesProvider, public navCtrl: NavController, public navParams: NavParams) {

    ////this.categoryProvider = new CategoriesProvider(db);

    //var cat: Category = new Category();
    //cat.active = true;
    //cat.name = 'Fashion';
    //cat.icon = 'shirt';
    //cat.id = 2;
    //cat.parentKey = '0'
    //cat.urlName = 'fashion';
    //cat.googleCategoryId = 1604;

    //this.categoryProvider.createCategory(cat);

    //cat.active = true;
    //cat.name = 'Televisions';
    //cat.icon = 'tablet-portrait';
    //cat.id = 13;
    //cat.parentKey = '-KuUzou6m7-uczh7hN0L'
    //cat.urlName = 'televisions';
    //cat.googleCategoryId = 404;

    //this.categoryProvider.createCategory(cat);

    //cat.active = true;
    //cat.name = 'Teblets';
    //cat.icon = 'tablet-portrait';
    //cat.id = 12;
    //cat.parentKey = '-KuUzou6m7-uczh7hN0L'
    //cat.urlName = 'tablets';
    //cat.googleCategoryId = 4745;

    //this.categoryProvider.createCategory(cat);

    //cat.active = true;
    //cat.name = 'Laptops';
    //cat.icon = 'tablet-portrait';
    //cat.id = 14;
    //cat.parentKey = '-KuUzou6m7-uczh7hN0L'
    //cat.urlName = 'laptops';
    //cat.googleCategoryId = 328;

    //this.categoryProvider.createCategory(cat);

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ionViewWillEnter() {
      var pagePath: string = '/list';

      gtag('config', Constant.GA_TRACKING_ID, {
          'page_title': 'List',
          'page_location': Constant.BASE_PATH + pagePath,
          'page_path': pagePath
      });

      console.log('page_location:' + Constant.BASE_PATH + pagePath);
      console.log('page_path:' + pagePath);
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
