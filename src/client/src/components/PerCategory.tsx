import { useQuery } from '@apollo/client';

import { humanDecimal } from '../helpers';

import { PER_CATEGORY, PerCategoryByFollowersQuery } from '../queries';

const PerCategory = () => {
  const { data: perCatData } =
    useQuery<PerCategoryByFollowersQuery>(PER_CATEGORY);

  return (
    <div>
      <h3>Top influencers by category</h3>
      {perCatData?.perCategoryByFollowers.nodes.map((node) => {
        const categoryName = node?.ID;
        const influencers = node?.value || [];
        const howMany = 5;

        return (
          <details key={categoryName}>
            <summary>
              {categoryName} — <strong>{influencers[0].ID}</strong> out of{' '}
              {influencers.length}
            </summary>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Name</th>
                  <th className="number">Followers ⬇️</th>
                </tr>
              </thead>
              <tbody>
                {influencers.slice(0, howMany).map((inf, index) => (
                  <tr key={inf.ID}>
                    <td>{inf.ID}</td>
                    <td>{inf.screenName}</td>
                    <td className="number">{humanDecimal(inf.followers)}</td>
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

export default PerCategory;
