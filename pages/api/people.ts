const sqlite = require('sqlite');

export default async (req, res) => {

  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'GET') {

    const person = await db.all('select * from person');

    res.status(200).json(person);

  }

  else {

    res.status(400).json({ message: 'Only GET is supported' })

  }

}
