import { createReadStream } from 'node:fs';

import { Resolvers, Influencer } from './types';

function getCategories() {
  return ['boop', 'smoop'];
}

function getCountries() {
  return ['country', 'shmountry'];
}

const resolvers: Resolvers = {
  Query: {
    all() {
      return {
        nodes: [],
      };
    },

    filter(obj, args, context, info) {
      const { categories, countries } = args?.filter;

      console.log({ categories, countries });

      return { nodes: [] };
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
