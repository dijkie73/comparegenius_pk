import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Constant from '../../environment';

declare var gtag: Function;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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

}
