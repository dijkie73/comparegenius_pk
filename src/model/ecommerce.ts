//interface IDictionary<TValue> {
//    [id: string]: TValue;
//}

export class KeyTypeId {
    key: string;
    typeId: string;
}

export class FeatureGroup {
    $key: string;
    sortNr: number;
    name: Map<string, string>; // name of FeatureGroup in specific languages (i.e. "en", "nl")

    getLocalizedName(language: string) {
        return this.name[language];
    }
}

export class OldCategory {
    $key: string;
    id: number;
    name: string;
    urlName: string;
    active: boolean = true;
    parentKey: string;
    icon: string;
    googleCategoryId: number;
}

export class Category {
    $key: string; // The unique ID of the category (unique auto generated Firebase push ID).

    version: number // The current version of the category.
    createdAt: string; // Firebase has no type Date
    lastModifiedAt: string; // Firebase has no type Date

    key?: string; // User-specific unique identifier for the category.
    description?: Map<string, string>; // description in specific languages (i.e. "en", "nl");
    slug: Map<string, string>; // deep-link URL to the related category in specific languages (i.e. "en", "nl");

    orderHint: number;
    ancestors?: KeyTypeId[];  // Array of Reference to a Category. Contains the parent path towards the root category.
    parent?: KeyTypeId; // Reference to a Category. A category that is the parent of this category in the category tree.
    parentId: string;

    metaDescription: Map<string, string>; // meta description in specific languages (i.e. "en", "nl");
    metaTitle: Map<string, string>; // meta title in specific languages (i.e. "en", "nl");
    name: Map<string, string>; // category name in specific languages (i.e. "en", "nl");

    active: boolean = true;
    faIcon: string;
    googleCategoryId: number;

    constructor() {
        console.log('Category constructor called');
      this.createdAt = new Date(Date.now()).toISOString();
      this.lastModifiedAt = this.createdAt;
    }
}

export class GoogleProductCategory {
    id: number;
    parentId: number;
    category: string;
    fullCategory: string;
}

export class Offer {
    $key: string;
    productKey: string;
    seller: Seller;
    price: number;
    currency: string;
    feedId: number;
    shopUrl: string;
    affiliateUrl: string; //var myOtherUrl = "http://example.com/index.html?url=" + encodeURIComponent(myUrl);
}


export class AggregateOffer {
    $key: string;
    lowPrice: number;
    highPrice: number;
    priceCurrency: string;
    offerCount: number;
}


export abstract class Thing {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getJsonLd() {
        return JSON.stringify(this);
    }

    toJSONLd() {
        return {
            "@type": "Thing",
            "name": this.name
        };
    }
}

export class Brand extends Thing {

    constructor(name: string) {
        super(name);
    }

    toJSONLd() {
        return super.toJSONLd();
    }

}

export class Image {
    src: string;
    title: string;
    alt: string;
    position: number;
}

export class ProductVariant {
    $key: string;
}

export class Product {
    $key: string;
    id: number;
    title: string;
    brand: Brand;
    shortDescription: string;
    urlName: string;
    categoryKey: string;
    featuredImage: string;
    images: Image[];
    bestPrice: number;

    //    toJSONLd = function () {
    //        return {
    ////            "@type": "Product",
    //            "name": this.title,
    //            "image": [
    //                this.featuredImage
    //            ],
    //            "images": [
    //                this.featuredImage
    //            ],s
    //            "brand": this.brand.name //toJSONLd(),
    //            //"offers": {
    //            //    "@type": "AggregateOffer",
    //            //    "lowPrice": "119.99",
    //            //    "highPrice": "199.99",
    //            //    "offerCount": 2,
    //            //    "priceCurrency": "PKR"
    //            //}
    //        };
    //}
}

export class Organization extends Thing {
    logo: string;

    constructor(name: string) {
        super(name);
    }
}

export class Seller extends Organization {
    $key: string;
    url: string;
}
