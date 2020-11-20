const express = require('express');
const jwt = require('jsonwebtoken')
const logger = require('../config/logger');
const config = require('../config/config');
const user = require('../models/user');
const app = express();

app.set('key', config.key);

app.post('/login', (req, res) => {
    let body = req.body;

    let email = body.email;
    let password = body.password;
    user.findOne({email}, (err, userDB) => {
        if (err) {
            logger.error(err)
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        if(userDB && email === userDB.email && password === userDB.password) {
            const payload = {
                check:  true
            };
            const token = jwt.sign(payload, app.get('key'), {
                expiresIn: 1440
            });
            res.json({
                ok: true,
                mensaje: 'Logged successfully',
                token: token,
                user: {
                    name: userDB.name,
                    email: userDB.email
                }
            });
        } else {
            res.json({ 
                message: 'Incorrect credentials'
            })
        }
        // res.json({
        //     ok: true,
        //     users: userDB
        // })
    })
})

module.exports = app;