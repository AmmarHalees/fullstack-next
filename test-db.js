const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./mydb.sqlite');
    await db.migrate({ force: 'last' });

    const people = await db.all('SELECT * FROM person');
    console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

}

setup();