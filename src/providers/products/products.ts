import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Product, Image } from '../../model/ecommerce';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';



/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {
    private basePath: string = '/products';

    products: FirebaseListObservable<Product[]> = null; //  list of objects
    product: FirebaseObjectObservable<Product> = null; //   single object

    //const limit: BehaviorSubject<number> = new BehaviorSubject<number>(3);
    lastKey: string = '';
    queryable: boolean = true;
    offset: number = 3;


    constructor(private db: AngularFireDatabase) {
        this.products = this.db.list(this.basePath);
    }

    getLimitedProductList(offset, startKey?): FirebaseListObservable<Product[]> {
        var p = new Product();

        return this.db.list(this.basePath, {
            query: {
                orderByChild: 'title',
                startAt: startKey,
                limitToFirst: offset + 1
            }
        });
    }

    getProductsList(query = {}): FirebaseListObservable<Product[]> {
        this.products = this.db.list(this.basePath, {
            query: query
        });

        return this.products
    }

    // Return a single observable item
    getProduct(key: string): FirebaseObjectObservable<Product> {
        const productPath = '${this.basePath}/${key}';
        this.product = this.db.object(productPath)

        return this.product
    }

    // Return a single observable item
    getMainProductsList(query = {}): FirebaseListObservable<Product[]> {
        this.products = this.db.list(this.basePath, {
            query: {
                orderByChild: 'title'
            }
        });

        return this.products
    }

    getMainProducts() {

    }

    // CRUD operations
    createProduct(product: Product): void {
        this.products.push(product)
            .catch(error => this.handleError(error))
    }
    // Update an existing product
    updateProduct(key: string, value: any): void {
        this.products.update(key, value)
            .catch(error => this.handleError(error))
    }
    // Deletes a single product
    deleteProduct(key: string): void {
        this.products.remove(key)
            .catch(error => this.handleError(error))
    }
    // Deletes the entire list of products
    deleteAll(): void {
        this.products.remove()
            .catch(error => this.handleError(error))
    }
    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

}
