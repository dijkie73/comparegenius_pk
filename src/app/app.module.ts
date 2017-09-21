import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Menu } from '../pages/menu/menu';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import { ProductDetailsPage } from '../pages/product-details/product-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoriesProvider } from '../providers/categories/categories';
import { ProductsProvider } from '../providers/products/products';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ComponentsModule } from '../components/components.module';

//import { FaIconComponent } from "../components/fa-icon/fa-icon";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    Menu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    Menu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriesProvider,
    ProductsProvider
  ]
})
export class AppModule {}
