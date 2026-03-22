const jsonwebtoken = require('jsonwebtoken');

function authenticateToken(req, res, next ) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error:'user is not logged in'});
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET,(error, decoded) => {

        if(error) {
            return res.status(401).json({ error:'an error has occured' });
        }

        req.user = decoded;
        next();
    })

}

module.exports = authenticateToken;