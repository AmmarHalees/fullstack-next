const sqlite = require('sqlite');
const { hash } = require('bcrypt');


export default async (req, res) => {

    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'POST') {

        hash(req.body.password, 10, async function (err, hash) {

            const statement = await db.prepare(
                'INSERT INTO person (name,email, password) values (?, ?, ?)'
            );

            const result = await statement.run(
                req.body.name,
                req.body.email,
                hash
            );
            result.finalize();


            const person = await db.all('select * from person');

            res.status(200).json(person);

        })

    }
    else {

        res.status(400).json({ message: 'Only POST is supported' })

    }

}
