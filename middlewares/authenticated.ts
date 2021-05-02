
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
const authenticated = (originalFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

    jwt.verify(req.cookies.auth, process.env.secret, async function (err, decoded) {

        if (!err && decoded) {

            return await originalFunction(req, res)

        } else {

            res.status(401).json({ message: 'youre not authorized' })

        }

    });



}


export default authenticated;