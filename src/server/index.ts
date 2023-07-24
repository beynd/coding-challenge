import express, { Express, Request, Response } from 'express';
import { parseCSV } from './utils/parseCSV';
import { Account } from './../types';

let data: Account[] = [];

parseCSV('./data/instagram_influencers.csv')
  .then((accounts: Account[]) => {
    data = accounts;
  })
  .catch((err: Error) => {
    console.log(err);
  });

const app: Express = express();

app.get('/data', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
