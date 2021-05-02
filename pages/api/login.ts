const sqlite = require('sqlite');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
import cookie from 'cookie';

export default async (req, res) => {

    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'POST') {


        const person = await db.get('select * from person where email = ?', [
            req.body.email
        ]);

        if (person) {
            compare(req.body.password, person.password, (err, result) => {

                if (!err && result) {

                    const claims = { sub: person.id, name: person.name };// the body
                    const jwt = sign(claims, process.env.secret, { expiresIn: '1h' })

                    res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {

                        httpOnly: true, // js has no access
                        secure: process.env.NODE_ENV !== 'development', //cookie only transfered over https
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: "/"


                    }))


                } else {

                    res.status(400).json({ message: 'Incorrect password' })

                }


                res.status(200).json(person)

            })


        } else {

            res.status(404).json({ message: 'not found' })

        }


    }

    else {

        res.status(400).json({ message: 'Only GET is supported' })

    }

}
