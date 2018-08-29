require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require ('../model/user');

module.exports = {
    async createUser (req, res) {
        try{
            if(!req.body.username || !req.body.password) return res.status(500).json({'Error':'No username or password'});
            let user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password,10)
            });
            const newUser = await User.create(user);
            return res.status(200).json({'Response':newUser});
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    },
    async loginUser(req, res) {
        try{
            //Separate data and extract username and password from the request header
            let header=req.headers['authorization']||'', 
            token=header.split(/\s+/).pop()||'',        
            auth=new Buffer.from(token, 'base64').toString(),
            parts=auth.split(/:/),
            
            user = await User.findOne({username:parts[0]});

            if(user !== null){
                //Validate password given with password stored
                if (bcrypt.compareSync(parts[1],user.password)){
                    let token = jwt.sign({_id:user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60)},process.env.JWT_ENCRYPTION)
                    return res.status(200).json({'token':token});
                } else {
                    return res.status(401).json({'Error':'Invalid Password'});
                }
            }else{
                return res.status(401).json({'Error':'Username not found'});
            }
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    }
}