require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ error: 'Authorization header is missing' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log('Error:', e);
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = auth;

