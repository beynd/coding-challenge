const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/instagram_influencers.sqlite3');

async function main() {
    db.serialize(() => {
        db.get("select * from influencers LIMIT 1", (err: Error, row: any) => {
            console.log(row);
        });
    });
}

main().then();