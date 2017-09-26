import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FeatureGroup } from '../../model/features';

@Injectable()
export class FeaturesProvider {
    private featureGroupPath: string = '/featureGroups';

    featureGroups$: FirebaseListObservable<FeatureGroup[]> = null; //  list of objects
    featureGroup$: FirebaseObjectObservable<FeatureGroup> = null; //   single object

    constructor(private db: AngularFireDatabase) {
        this.featureGroups$ = this.getFeatureGroupsList();
        console.log('constr featureGroup');
        console.log(this.featureGroups$);
    }

    getSortedFeatureGroups(): FirebaseListObservable<FeatureGroup[]> {
        return this.getFeatureGroupsList();

        //return this.getFeatureGroupsList({ orderByChild: 'sortNr' });
    }

    getFeatureGroupsList(query = {}): FirebaseListObservable<FeatureGroup[]> {
        this.featureGroups$ = this.db.list(this.featureGroupPath, {
            query: query
        });

        return this.featureGroups$;
    }

    createFeatureGroups()
    {

      //var fg = new FeatureGroup();
      //fg.sortNr = 3;
      //fg.name = { "en": "Battery", "nl": "Batterij" };
      //this.createFeatureGroup(fg);

      //fg = new FeatureGroup();
      //fg.sortNr = 4;
      //fg.name = { "en": "Connectivity", "nl": "Verbindingen" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 5;
      //fg.name = { "en": "Software", "nl": "Software" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 6;
      //fg.name = { "en": "Sound", "nl": "Geluid" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 7;
      //fg.name = { "en": "Camera", "nl": "Camera" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 8;
      //fg.name = { "en": "Sensors", "nl": "Sensors" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 9;
      //fg.name = { "en": "Display", "nl": "Beeldscherm" };
      //this.createFeatureGroup(fg);

      //var fg = new FeatureGroup();
      //fg.sortNr = 10;
      //fg.name = { "en": "Design", "nl": "Uiterlijk" };
      //this.createFeatureGroup(fg);
    }

      // CRUD operations

      // Return a single observable category with $key == key
      getFeatureGroup(key: string): FirebaseObjectObservable <FeatureGroup> {
          const featureGroupKeyPath = this.featureGroupPath + '/' + key;

          console.log('path: ' + featureGroupKeyPath);
          this.featureGroup$ = this.db.object(featureGroupKeyPath);

          return this.featureGroup$;
      }

      // Create a new category
      createFeatureGroup(category: FeatureGroup): void {

          this.featureGroups$.push(category)
              .catch(error => this.handleError(error));
      }

      // Update an existing category
      updateFeatureGroup(key: string, value: any): void {
          this.featureGroups$.update(key, value)
              .catch(error => this.handleError(error));
      }
      // Deletes a single category
      deleteFeatureGroup(key: string): void {
          this.featureGroups$.remove(key)
              .catch(error => this.handleError(error));
      }
      // Deletes the entire list of categories
      deleteAll(): void {
          this.featureGroups$.remove()
              .catch(error => this.handleError(error));
      }
    // Default error handling for all actions
    private handleError(error) {
        console.log('Error in FeaturesProvider: ');
          console.log(error);
      }


}
