import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    searchQuery: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(navParams.get("searchQuery"));

        this.searchQuery = navParams.get("searchQuery");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
