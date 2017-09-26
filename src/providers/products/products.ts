import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Product, ProductVariant } from '../../model/ecommerce';

@Injectable()
export class ProductsProvider {
    private basePath: string = '/products';

    products$: FirebaseListObservable<Product[]> = null; //  list of objects
    product$: FirebaseObjectObservable<Product> = null; //   single object
    variants$: FirebaseListObservable<ProductVariant[]> = null; //  list of objects

    lastKey: string = '';
    queryable: boolean = true;
    offset: number = 3;

    constructor(private db: AngularFireDatabase) {
        this.products$ = this.getProductsList();
    }

    getLimitedProductList(offset, startKey?): FirebaseListObservable<Product[]> {
        var query = {
            orderByChild: 'title',
            startAt: startKey,
            limitToFirst: offset + 1
        };

        return this.getProductsList(query);
    }

    getProductsList(query = {}): FirebaseListObservable<Product[]> {
        this.products$ = this.db.list(this.basePath, {
            query: query
        });

        return this.products$
    }

    // Return a single observable item
    getProduct(key: string): FirebaseObjectObservable<Product> {
        const productPath = this.basePath + '/' + key;
        this.product$ = this.db.object(productPath);

        return this.product$;
    }

    // Return a single observable item
    getMainProductsList(query = {}): FirebaseListObservable<Product[]> {
        this.products$ = this.db.list(this.basePath, {
            query: {
                orderByChild: 'title'
            }
        });

        return this.products$;
    }

    getMainProducts() {

    }

    createSellers() {
        this.createSeller('symbios.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1505837290/logo/symbios.pk-logo.png', 'http://www.symbios.pk/', 'v1505837290/logo/symbios.pk-logo');
        this.createSeller('iShopping.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1505833248/logo/ishopping.pk-logo.png', 'https://www.ishopping.pk/', 'v1505833248/logo/ishopping.pk-logo');
        this.createSeller('mega.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1505836422/logo/mega.pk-logo.png', 'http://www.mega.pk/', 'v1505836422/logo/mega.pk-logo');
        this.createSeller('yayvo.com', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1505830461/logo/yayvo_logo.png', 'http://yayvo.com/', 'v1505830461/logo/yayvo_logo');
        this.createSeller('homeshopping.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1505834086/logo/homeshopping.pk-logo.png', 'https://homeshopping.pk/', 'v1505834086/logo/homeshopping.pk-logo');
        this.createSeller('myshop.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto//506255536/logo/myshop.pk-logo.png', 'https://myshop.pk/', 'v1506255536/logo/myshop.pk-logo');
        this.createSeller('shophive.com', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1506257036/logo/shophive.com-logo.pngg', 'http://www.shophive.com/', 'v1506257036/logo/shophive.com-logo');
        this.createSeller('well.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1506257602/logo/well.pk-logo.png', 'https://well.pk/', 'v1506257602/logo/well.pk-logo');
        this.createSeller('telemart.pk', 'https://res.cloudinary.com/comparegenius/image/upload/c_scale,h_33,q_auto/v1506258021/logo/telemart.pk-logo.png', 'https://www.telemart.pk/', 'v1506258021/logo/telemart.pk-logo');
    }
    createSeller(name: string, logo: string, url: string, cloudinaryLogo: string) {
        this.db.list('/sellers').push({ country: "PK", logo: logo, name: name, url: url, cloudinaryLogo: cloudinaryLogo });
    }
    // CRUD operations
    createProduct(product: Product): void {
        this.products$.push(product)
            .catch(error => this.handleError(error));
    }
    // Update an existing product
    updateProduct(key: string, value: any): void {
        this.products$.update(key, value)
            .catch(error => this.handleError(error));
    }
    // Deletes a single product
    deleteProduct(key: string): void {
        this.products$.remove(key)
            .catch(error => this.handleError(error));
    }
    // Deletes the entire list of products
    deleteAll(): void {
        this.products$.remove()
            .catch(error => this.handleError(error));
    }

    // Product Variants

    // Gets all product variants of an existing product with specified key
    getProductVariants(productKey: string): FirebaseListObservable<ProductVariant[]> {
        return;
    }

    // Gets all product variants of an existing product with specified key
    getProductVariant(variantKey: string): FirebaseObjectObservable<ProductVariant> {
        return;
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error);
    }

}
