import React, { useMemo } from 'react';
import { FilterQuery } from '../queries';
import { humanDecimal } from '../helpers';

const ResultsTable = ({
  influencers,
}: {
  influencers: FilterQuery['filter']['nodes'];
}) => {
  const sortedByFollowersDesc = useMemo(() => {
    if (!influencers) return [];

    return (
      [...influencers].sort(
        (a, b) => (b?.followers || 0) - (a?.followers || 0),
      ) || []
    );
  }, [influencers]);

  return (
    <>
      <h3>
        👉 Results{' '}
        <code>
          <small>{influencers.length}</small>
        </code>
      </h3>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Country</th>
            <th>Categories</th>
            <th className="number">Authentic engagement %</th>
            <th className="number">Followers ⬇️</th>
          </tr>
        </thead>
        <tbody>
          {sortedByFollowersDesc.map((influencer) => (
            <tr key={influencer?.ID}>
              <td>{influencer?.ID}</td>
              <td>{influencer?.screenName}</td>
              <td>{influencer?.country}</td>
              <td>
                {influencer?.categories.length
                  ? influencer?.categories.join(', ')
                  : 'N/A'}
              </td>
              <td className="number">
                {(
                  ((influencer?.engagement.authentic || 1) /
                    (influencer?.engagement.average || 1)) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td className="number">{humanDecimal(influencer?.followers)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultsTable;
