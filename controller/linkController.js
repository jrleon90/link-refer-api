require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const Link = require ('../model/link');

module.exports = {
    async createLink(req,res){
        try{
            if(!req.body.link_title) return res.status(500).json({'Error':'No Link title found'});

            const link = new Link({
                link_title: req.body.link_title,
                clicks: 0
            });

            const newLink = await Link.create(link);
            return res.status(200).json({'Response': newLink});

        } catch(err){
            return res.status(500).json({'Error':err});
        }
        
    },
    async editLink(req, res){
        try{

            const linkToUpdate = await Link.findOne({link_title: req.params.link_title});
            if(linkToUpdate){
                const newLink = {
                    link_title: req.body.link_title
                };
                await Link.findOneAndUpdate({link_title: req.params.link_title},newLink);
                return res.status(200).json({'Response':'Link updated!'});
            }else{
                return res.status(401).json({'Response':'Link not found'});
            }
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    },
    async deleteLink(req, res){
        try{
            const linkToDelete = await Link.findOne({link_title: req.params.link_title});
            if(linkToDelete){
                await Link.deleteOne({link_title:req.params.link_title});
                return res.status(200).json({'Response': 'Link deleted'});
            }else{
                return res.status(401).json({'Response':'Link not found'});
            }
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    },
    async getAllLink(req, res){
        try{
            const links = await Link.find({});
            return res.status(200).json({'Response':links});
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    },
    async clickLink(req, res){
        try{
            let link = await Link.findOne({link_title: req.params.link_title});
            if(link){
                await Link.findOneAndUpdate({link_title: req.params.link_title},{$inc:{clicks: 1}});
                link = await Link.findOne({link_title: req.params.link_title});
                return res.status(200).json({'Response':link});
            }else{
                return res.status(401).json({'Error':'Link not found'});
            }
        }catch(err){
            return res.status(500).json({'Error':err});
        }
    }
}