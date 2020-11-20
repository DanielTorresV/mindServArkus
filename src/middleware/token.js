const express = require('express');
const jwt = require('jsonwebtoken')

const segureRoutes = express.Router(); 

segureRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Valid Token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token not provided' 
      });
    }
 });