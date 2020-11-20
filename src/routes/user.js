const express = require('express');
// const bcrypt = require('bcrypt')
const logger = require('../config/logger');
const user = require('../models/user');
const User = require('../models/user');
const app = express();

/**
  * @swagger
  * /users:
  *     get:
  *         description: Get all users
  *         responses:
  *             200:
  *                 description: Success
  *             400:
  *                 description: Bad request
  */
app.get('/users', (req, res)=>{
    user.find({}).exec((err, usersDB) => {
        if (err) {
            logger.error(err)
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            users: usersDB
        })
    })
});

/**
 *  @swagger
 *  /user/:id:
 *      get:
 *          description: Get an user
 *          parameters:
 *          - name: id
 *            description: User id
 *            in: formaData
 *            required: true
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 */
app.get('/user/:id', (req,res) => {

    let id = req.params.id;
    
    user.findById(id, (err, userDB) => {
        if (err) {
            logger.error(err)
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.post('/user', (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        // password: bcrypt.hashSync(body.password, 10),
        password: body.password
    })

    user.save((err, userDB) => {
        if (err) {
            logger.error(err)
            return res.status(400).json({
                ok:false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

});

app.put('/user/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;
    user.findByIdAndUpdate(id, body, (err, userDB) => {

        if (err) {
            logger.error(err)
            return res.status(400).json({
                ok:false,
                err: err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});

module.exports = app;