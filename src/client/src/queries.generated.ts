import type * as Types from './types';

export type StaticQueryVariables = Types.Exact<{ [key: string]: never }>;

export type StaticQuery = {
  countries: Array<string>;
  categories: Array<string>;
};

export type FilterQueryVariables = Types.Exact<{
  filterInput: Types.FilterInput;
}>;

export type FilterQuery = {
  filter: {
    nodes: Array<{
      ID: string;
      screenName: string | null;
      country: string;
      categories: Array<string>;
      followers: number;
      engagement: { authentic: number; average: number };
    } | null>;
  };
};

export type PerCategoryByFollowersQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PerCategoryByFollowersQuery = {
  perCategoryByFollowers: {
    nodes: Array<{
      ID: string;
      value: Array<{
        ID: string;
        screenName: string | null;
        followers: number;
      }>;
    } | null>;
  };
};

export type PerCountryByEngAvgQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type PerCountryByEngAvgQuery = {
  perCountryByEngAvg: {
    nodes: Array<{
      ID: string;
      value: Array<{
        ID: string;
        screenName: string | null;
        engagement: { average: number };
      }>;
    } | null>;
  };
};
