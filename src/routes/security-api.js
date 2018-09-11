const express = require('express');
const jwt = require('jsonwebtoken');
const api = express.Router();

const logIn = (username, password) => {
    if (username === 'admin' && password === 'admin') {
        const userData = {
            name: 'Admin',
            permissions: [ 'admin:create:match', 'admin:update:scores' ]
        };
        return generateToken(userData);
    }
    return null;
};

const generateToken = userData => {
    return jwt.sign(userData, 's3cret', { expiresIn: '3h' })
};

api
    .route('/auth')
    .post((req, res, next) => {
        let { username, password } = req.body;
        let token = logIn(username, password);

        if (token) {
            res.send(token);
        } else {
            next(new Error('Authentication failed'))
        }
    });

module.exports = api;
