import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Category } from '../../model/ecommerce';

@Injectable()
export class CategoriesProvider {
    private basePath: string = '/categories';

    categories$: FirebaseListObservable<Category[]> = null; //  list of objects
    category$: FirebaseObjectObservable<Category> = null; //   single object

    constructor(private db: AngularFireDatabase) {
        this.categories$ = this.getCategoriesList();
    }

    getCategoriesList(query = {}): FirebaseListObservable<Category[]> {
        this.categories$ = this.db.list(this.basePath, {
            query: query
        });

        return this.categories$;
    }

    // returns a list of main categories, so filtered on parentKey = 0 (no parentt)
    getMainCategoriesList(query = {}): FirebaseListObservable<Category[]> {
        this.categories$ = this.db.list(this.basePath, {
            query: {
                orderByChild: 'parentId',
                equalTo: ''
            }
        });

        return this.categories$;
    }

    // returns a list of main categories, so filtered on parentKey = 0 (no parentt)
    getSubCategoriesList(categoryKey: string): FirebaseListObservable<Category[]> {
        this.categories$ = this.db.list(this.basePath, {
            query: {
                orderByChild: 'parentId',
                equalTo: categoryKey
            }
        });

        return this.categories$;
    }
    // CRUD operations

    // Return a single observable category with $key == key
    getCategory(key: string): FirebaseObjectObservable<Category> {
        const categoryPath = this.basePath + '/' + key;

        this.category$ = this.db.object(categoryPath);

        return this.category$;
    }

    cloneCategory(key: string): string {
        this.category$ = this.getCategory(key);

        var pushKey = this.categories$.push(this.category$).key;

        return pushKey;
    }

    // Create a new category
    createCategory(category: Category): void {

        this.categories$.push(category)
            .catch(error => this.handleError(error));
    }

    // Update an existing category
    updateCategory(key: string, value: any): void {
        this.categories$.update(key, value)
            .catch(error => this.handleError(error));
    }
    // Deletes a single category
    deleteCategory(key: string): void {
        this.categories$.remove(key)
            .catch(error => this.handleError(error));
    }
    // Deletes the entire list of categories
    deleteAll(): void {
        this.categories$.remove()
            .catch(error => this.handleError(error));
    }
    // Default error handling for all actions
    private handleError(error) {
        console.log('Error in CategoriesProvider: ');
        console.log(error);
    }
}
