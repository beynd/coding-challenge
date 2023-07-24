import {Account, Result} from './../types';

export default async function main() {
  const data = await fetch('http://localhost:3000/data')
    .then(res => res.json())
    .then((data: Account[]) => data);

  const topInfluencerPerCountry  = data.reduce((acc: Result, curr: Account) => {
    if (curr.audienceCountry === 'N/A') {
      return acc;
    }

    const account = acc[curr.audienceCountry];
    if (account) { 
      if (account.engagementAvg < curr.engagementAvg) {
        acc[curr.audienceCountry] = curr;
      }
    } else {
      acc[curr.audienceCountry] = curr;
    }

    return acc;
  }, {} as Result);

  const topInfluencerPerCategory = data.reduce((acc: Result, curr: Account) => {
    curr.categories.forEach((category: string) => {
      if (category === '') {
        return;
      }

      const account = acc[category];
      if (account) {
        if (account.followers < curr.followers) {
          acc[category] = curr;
        }
      } else {
        acc[category] = curr;
      }
    });
    return acc;
  }, {} as Result);

  console.log('Top influencer per country', topInfluencerPerCountry);
  console.log('Top influencer per category', topInfluencerPerCategory);
}

main();
