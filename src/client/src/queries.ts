import { gql } from '@apollo/client';

export const STATIC = gql`
  query Static {
    countries
    categories
  }
`;

export type { StaticQuery } from './queries.generated';

export const FILTER = gql`
  query Filter($filterInput: FilterInput!) {
    filter(filter: $filterInput) {
      nodes {
        ID
        screenName
        country
        categories
        followers
        engagement {
          authentic
          average
        }
      }
    }
  }
`;

export type { FilterQuery, FilterQueryVariables } from './queries.generated';

export const PER_CATEGORY = gql`
  query PerCategoryByFollowers {
    perCategoryByFollowers {
      nodes {
        ID
        value {
          ID
          screenName
          followers
        }
      }
    }
  }
`;

export type { PerCategoryByFollowersQuery } from './queries.generated';

export const PER_COUNTRY = gql`
  query PerCountryByEngAvg {
    perCountryByEngAvg {
      nodes {
        ID
        value {
          ID
          screenName
          engagement {
            average
          }
        }
      }
    }
  }
`;

export type { PerCountryByEngAvgQuery } from './queries.generated';
