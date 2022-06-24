const sqlite3 = require('sqlite3').verbose();
import express, {Express, Request, Response} from 'express';

async function main() {
    const db = new sqlite3.Database('data/instagram_influencers.sqlite3');
    const app: Express = express();
    const port = 3000;

    app.get('/', (req: Request, res: Response) => {
        db.serialize(() => {
            db.get("select * from influencers", (err: Error, row: any) => {
                console.log(row);
            });
        });
    })

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}

main().then();