import { NextApiRequest, NextApiResponse } from "next";
import authenticated from "../../middlewares/authenticated";
const sqlite = require('sqlite');




export default authenticated(async (req: NextApiRequest, res: NextApiResponse) => {

  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'GET') {

    const people = await db.all('select email,name,id from person');

    res.status(200).json(people);

  }

  else {

    res.status(400).json({ message: 'Only GET is supported' })

  }

})
