export interface INYTimesStoriesResponse {
  status: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: INYTimesStory[];
}

export interface INYTimesStory {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: INYTimesMultimedia[];
}

export interface INYTimesMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  credit: string;
}

export interface INewsState {
  ReducerForTopNews: {
    isLoading: boolean;
    topWorldNewsList: INYTimesStory[];
    topScienceNewsList: INYTimesStory[];
    error: string | null;
  };
}

export interface INYTimesSearchArticleResponse {
  status: string;
  copyright: string;
  response: INYTimesArticleResponse;
}

export interface INYTimesArticleResponse {
  docs: INYTimesArticle[];
}

export interface INYTimesArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: INYTimesMultimedia[];
  headline: any;
  byline: any;
  pub_date: Date;
  keywords: any[];
}

export interface INYTimesMultimedia {
  rank: number;
  subtype: string;
  caption: string;
  credit: string;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: INYTimesMultimediaLegacy;
  crop_name: string;
}

export interface INYTimesMultimediaLegacy {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
  // Add more properties as needed
}
