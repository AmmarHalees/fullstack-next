const sqlite = require('sqlite');

export default async (req, res) => {

    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'GET') {

        const person = await db.get('select * from person where id = ?', [
            req.query.id
        ]);

        res.status(200).json(person);

    }
    else if (req.method === 'PUT') {

        const statement = await db.prepare(
            'UPDATE person SET name= ?, email = ? where id = ?'
        );
        const result = await statement.run(
            req.body.name,
            req.body.email,
            req.query.id
        );
        result.finalize();


        const person = await db.get('select * from person where id = ?', [
            req.query.id
        ]);

        res.status(200).json(person);

    }
    else {

        res.status(400).json({ message: 'Only GET is supported' })

    }

}
