import csvParser from 'csv-parser';
import fs from 'fs';
import { Account, CsvRow } from './../../types';

const transformInt = (value: string) => {
  if (!value) return 0;
  const lastChar = value[value.length - 1];
  let multiplier = 1;
  if (lastChar === 'K') {
    multiplier = 1000;
  } else if (lastChar === 'M') {
    multiplier = 1000000;
  }
  return Math.floor(parseFloat(value) * multiplier);
}

export const parseCSV = (filePath: string): Promise<Account[]> => {
  return new Promise((resolve, reject) => {
    const results: Account[] = [];
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: CsvRow) => {
        const account: Account = {
          instaName: data["Influencer insta name"],
          instagramName: data["instagram name"],
          categories: [data["category_1"], data["category_2"]],
          followers: transformInt(data["Followers"]),
          audienceCountry: data["Audience country(mostly)"],
          authenticEngagement: transformInt(data["Authentic engagement"]),
          engagementAvg: transformInt(data["Engagement avg"])
        };
        results.push(account);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err: Error) => {
        console.log(err);
        reject(err);
      });
  });
}
