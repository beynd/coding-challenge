import { createReadStream } from 'node:fs';
import csv from 'csv-parser';

import { Resolvers, Influencer } from './types';

type Row = {
  name: string;
  screenName: string;
  'category.1': string;
  'category.2': string;
  followers: string;
  country: string;
  'eng.auth': string;
  'eng.avg': string;
};

const rows: Row[] = [];
let influencers: Influencer[] = [];
createReadStream('../../data/instagram_influencers.csv')
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => {
        switch (index) {
          case 0:
            return 'name';
            break;
          case 1:
            return 'screenName';
            break;
          case 2:
            return 'category.1';
            break;
          case 3:
            return 'category.2';
            break;
          case 4:
            return 'followers';
            break;
          case 5:
            return 'country';
            break;
          case 6:
            return 'eng.auth';
            break;
          case 7:
            return 'eng.avg';
            break;
          default:
            return header;
            break;
        }
      },
      mapValues: ({ header, value }: { header: string; value?: string }) => {
        if (header.startsWith('eng.') || header === 'followers') {
          if (!value) return '0';

          const multiplier = (value.match(/(K|M)/) || ['', ''])[1];
          let number = parseFloat(value.replace(multiplier, ''));
          number *=
            multiplier === 'K' ? 1000 : multiplier === 'M' ? 1000 * 1000 : 1;

          return number;
        }

        return value;
      },
    }),
  )
  .on('data', (row: Row) => rows.push(row))
  .on('end', () => {
    influencers = rows.map(rowToInfluencer);
  });

const rowToInfluencer = ({
  country,
  name,
  followers,
  screenName,
  'category.1': c1,
  'category.2': c2,
  'eng.auth': authentic,
  'eng.avg': average,
}: Row): Influencer => ({
  ID: name,
  country,
  screenName,
  categories: [c1, c2].filter(Boolean),
  followers: parseInt(followers),
  engagement: {
    authentic: parseInt(authentic),
    average: parseInt(average),
  },
});

function getCategories() {
  const categories = influencers.reduce((_, { categories }) => {
    if (!categories.length) {
      _.add('N/A');
    } else {
      categories.forEach((cat) => _.add(cat!));
    }
    return _;
  }, new Set<string>());

  return Array.from(categories).sort();
}

function getCountries() {
  const countries = influencers.reduce(
    (_, { country }) => _.add(country),
    new Set<string>(),
  );

  return Array.from(countries).sort();
}

const resolvers: Resolvers = {
  Query: {
    all() {
      return {
        nodes: influencers,
      };
    },

    filter(_, args) {
      const { categories, countries } = args?.filter;

      const nodes = influencers
        .filter(({ categories: cats }) =>
          cats.length
            ? categories?.some(
                (category) => category && cats.includes(category),
              )
            : categories?.includes('N/A'),
        )
        .filter(({ country }) => countries?.includes(country) || true);

      return { nodes };
    },

    countries() {
      return getCountries();
    },

    categories() {
      return getCategories();
    },
  },
};

export default resolvers;
