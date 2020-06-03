export type ArticleID = string;

export interface SearchResultsWithInfos {
  tiles: SearchResultWithInfos[];
}
export interface SearchResults {
  tiles: SearchResult[];
}

export interface SearchResult {
  data: {
    articleId: ArticleID;
    name: string;
    price: {
      normal: number;
      sale: number;
      unit: string;
      final: number;
    }
  }
}

export interface SearchResultWithInfos extends SearchResult {
  infos: ArticleInfos
}

export interface SearchFilter {
  category: string;
}

export interface ArticleInfos {
  name: string;
  nutritions: Nutritions[];
  measurements: Measurement[]
}

export interface Nutritions {
  preperationGrade: string;
  unit: string;
  relationValue: number;
  nutritions: Nutrition[];
}

export interface Nutrition {
  nutritionName: string;
  dailyRequirementPercent: number;
  unit: string;
  nutritionalValue: number;
  measureDefinition: string;
}

export interface Measurement {
  type: string;
  value: number;
  unit: string;
}