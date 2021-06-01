const jwt = require('jsonwebtoken');

class UserLogin {

    async required (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })

            jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
                if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
                
                req.user = decoded
                next()
            })
        } catch (error) {
            return res.status(401).send({ error: 'Failed to authenticate' });
        }
    }

    async optional (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_KEY);
            req.user = decode;
            next();
        } catch (error) {
            next();
        }
    }

}

module.exports = new UserLogin()