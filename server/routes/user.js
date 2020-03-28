const express = require('express');

const bcrypt =require('bcrypt');

const _=require('underscore');

const User = require('../models/users');

const { verifyToken }  = require('../middelwares/authentication');

const app = express();

app.get('/user',verifyToken, (req,res) =>  {
    

    let since = req.query.since || 0;
    since = Number(since);
    
    let limit = req.query.limit || 5;
    limit = Number(limit);
    

    User.find()
           .skip(since)
           .limit(limit)
           .exec((err,users)=>{

            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }

            User.count((err,count)=>{

              res.json({
                ok:true,
                users,
                counts:count
              });  

            });

            
           });

});

app.post('/user',function (req,res) {
    
    let body = req.body;

    let user = new User({

        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password,10), // crea el hash de una via danto 10 vueltas
    });


    user.save((err,user)=>{

        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        

        res.json({
            ok:true,
            user
        });
    });
    

});

app.put('/user/:id', [verifyToken],function (req,res) {
    
    let id = req.params.id;
    let body = _.pick(req.body,['name','email']);

    User.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,user)=>{ 
    
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }
        
        res.json({
            ok: true,
            user
        });
        
    });
    
});

app.delete('/user/:id',[verifyToken],function (req,res) {

    let id = req.params.id;

    User.findByIdAndRemove(id,(err,user)=>{

        if (err) {
            
            return res.status(400).json({
                ok: false,
                err

            });

        }

        if (!user) {
            
            return res.status(400).json({

                ok:false,
                err:{
                    
                    message: 'Usuario no encontrado'

                }
                
            })
        }

        res.json({
            ok:true,
            user
        });
    });



});



module.exports = app; 