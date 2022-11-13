const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utils/index');
const verifyTokenMiddleware = require('../middlewares/auth')

const ParentUser = require('../models/parentUser')
// const ChildUser = require('../models/childUser')

router.post('/users/signup', function(req, res, next) {

    var body = req.body;
    var hash = bcrypt.hashSync((body['password']), 10);

    console.log((body['firstName'])?.trim())
    console.log((body['lastName'])?.trim())
    console.log((body['email'])?.trim())
    console.log((body['password'])?.trim())
    console.log((body['confirmPassword'])?.trim())
    console.log((body['phoneNumber'])?.trim())

    var user = new ParentUser({
        email: (body['email']).trim(),
        phoneNumber: (body['phoneNumber']).trim(),
        firstName: (body['firstName']).trim(),
        lastName: (body['lastName']).trim(),
        password: hash,
    });
    user.save(function(err, user) {
       if (err) throw err;
       var token = utils.generateToken(user); 
       res.json({
          user: user,  
          token: token
       });
    });
});

router.post('/users/signin', function(req, res) {
    const {email, password} = req.body
    console.log('req.body ============>');
    console.log(req.body);
    ParentUser
    .findOne({email: req.body.email})   
    .exec(function(err, user) {
        console.log('req.body.password ============>')
        console.log(req.body.password)
        console.log('user ============>')
        console.log(user)

        bcrypt.compare(req.body.password, user.password,
            function(err, valid) {
                if (!user) {
                    return res.status(404).json({
                        error: true,
                        message: 'Username or Password is Wrong'
                    })
                }
        
                var token = utils.generateToken(user);

                console.log('token ============>')
                console.log(token)

                res.json({
                    user: user,  
                    token: token
                });
            }
        );                
     });
  });
    
module.exports = router;


// router.post('/users/signup', function(req, res, next) {

//     var body = req.body;
//     var hash = bcrypt.hashSync((body['password']).trim(), 10);

//     var user = new User({
//      email: (body['email']).trim(),
//      username: (body['username']).trim(),
//      phoneNumber: (body['phoneNumber']).trim(),
//      fullName: (body['fullName']).trim(),
//      password: hash,
//      dateOfBirth: (body['dateOfBirth']).trim()
//     });
//     user.save(function(err, user) {
//        if (err) throw err;
//        var token = utils.generateToken(user); 
//        res.json({
//           user: user,  
//           token: token
//        });
//     });
// });

// router.post('/users/signin', function(req, res) {
//     const {username, password} = req.body
//     console.log('req.body ============>');
//     console.log(req.body);
//     User
//     .findOne({username: req.body.username})   
//     .exec(function(err, user) {
//         console.log('req.body.password ============>')
//         console.log(req.body.password)
//         console.log('user ============>')
//         console.log(user)

//         bcrypt.compare(req.body.password, user.password,
//             function(err, valid) {
//                 if (!user) {
//                     return res.status(404).json({
//                         error: true,
//                         message: 'Username or Password is Wrong'
//                     })
//                 }
        
//                 var token = utils.generateToken(user);

//                 console.log('token ============>')
//                 console.log(token)

//                 res.json({
//                     user: user,  
//                     token: token
//                 });
//             }
//         );                
//      });
//   });

