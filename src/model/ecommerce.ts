export class Category {
    $key: string;
    id: number;
    name: string;
    urlName: string;
    active: boolean = true;
    parentKey: string;
    icon: string;
    googleCategoryId: number;
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
