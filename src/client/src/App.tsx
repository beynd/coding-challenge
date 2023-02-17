import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import useCachedQuery from './hooks/use-cached-query';

import {
  STATIC,
  StaticQuery,
  FILTER,
  FilterQuery,
  FilterQueryVariables,
} from './queries';

import Checkbox from './components/Checkbox';
import ResultsTable from './components/ResultsTable';
import PerCategory from './components/PerCategory';
import PerCountry from './components/PerCountry';

function App() {
  const [filters, setFilters] = useState({
    countries: new Set<string>(),
    categories: new Set<string>(),
  });

  const { data: staticData } = useQuery<StaticQuery>(STATIC);

  const { data, loading } = useCachedQuery<FilterQuery, FilterQueryVariables>(
    FILTER,
    {
      variables: {
        filterInput: {
          countries: Array.from(filters.countries),
          categories: Array.from(filters.categories),
        },
      },
    },
  );
  const filteredNodes = useMemo(() => data?.filter.nodes || [], [data]);

  const allFilteredCountries = useMemo(
    () => new Set(filteredNodes.map((influencer) => influencer?.country)),
    [filteredNodes],
  );

  const filteredCountriesCount = useMemo(
    () =>
      filteredNodes.reduce((_, influencer) => {
        const country = influencer?.country;
        if (!country) return _;

        _.set(country, _.has(country) ? _.get(country)! + 1 : 1);

        return _;
      }, new Map<string, number>()),
    [filteredNodes],
  );

  return (
    <>
      <div className="flexHorizontal">
        <PerCategory />
        <PerCountry />
      </div>

      <h3>
        Categories{' '}
        <button
          onClick={() => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              categories: new Set(staticData?.categories),
            }));
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              categories: new Set(),
            }));
          }}
        >
          None
        </button>
      </h3>

      <div className="filterBox">
        {staticData?.categories.map((categoryName) => (
          <Checkbox
            key={categoryName}
            name={categoryName}
            checked={filters.categories.has(categoryName)}
            onClick={({ target }) => {
              let { checked } = target as HTMLInputElement;
              filters.categories[checked ? 'add' : 'delete'](categoryName);

              setFilters((prevFilters) => ({
                ...prevFilters,
                categories: filters.categories,
              }));
            }}
          />
        ))}
      </div>

      <h3>Countries</h3>
      <div className="filterBox">
        {staticData?.countries.map((countryName) => (
          <Checkbox
            key={countryName}
            name={countryName}
            label={
              <>
                {countryName}{' '}
                {<code>{filteredCountriesCount?.get(countryName)}</code>}
              </>
            }
            disabled={!allFilteredCountries.has(countryName)}
            onClick={({ target }) => {
              let { checked } = target as HTMLInputElement;
              filters.countries[checked ? 'add' : 'delete'](countryName);

              setFilters((prevFilters) => ({
                ...prevFilters,
                countries: filters.countries,
              }));
            }}
          />
        ))}
      </div>

      <ResultsTable influencers={filteredNodes} />
    </>
  );
}

export default App;
