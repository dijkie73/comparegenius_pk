//interface IDictionary<TValue> {
//    [id: string]: TValue;
//}

export class FeatureGroup {
    $key: string;
    sortNr: number;
    name: Map<string, string>; // name of FeatureGroup in specific languages (i.e. "en", "nl")

    getLocalizedName(language: string) {
        return this.name[language];
    }
}
