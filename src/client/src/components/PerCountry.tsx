import { useQuery } from '@apollo/client';

import { humanDecimal } from '../helpers';

import { PER_COUNTRY, PerCountryByEngAvgQuery } from '../queries';

const PerCountry = () => {
  const { data } = useQuery<PerCountryByEngAvgQuery>(PER_COUNTRY);

  return (
    <div>
      <h3>Top influencers by country and average engagement</h3>
      {data?.perCountryByEngAvg.nodes.map((node) => {
        const countryName = node?.ID;
        const influencers = node?.value || [];
        const howMany = 5;

        return (
          <details key={countryName}>
            <summary>
              {countryName} — <strong>{influencers[0].ID}</strong> out of{' '}
              {influencers.length}
            </summary>

            <table className="fullWidth">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Name</th>
                  <th className="number">Engagement Average ⬇️</th>
                </tr>
              </thead>
              <tbody>
                {influencers.slice(0, howMany).map((inf, index) => (
                  <tr key={inf.ID}>
                    <td>{inf.ID}</td>
                    <td>{inf.screenName}</td>
                    <td className="number">
                      {humanDecimal(inf.engagement.average)}
                    </td>
                  </tr>
                ))}
                <tr>
                  {influencers.length >= howMany && (
                    <td colSpan={3}>{influencers.length - howMany} more...</td>
                  )}
                </tr>
              </tbody>
            </table>
          </details>
        );
      })}
    </div>
  );
};

export default PerCountry;
