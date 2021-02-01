const express = require("express");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const User = require('../../models/models').User;
const Address = require('../../models/models').Address;
const response = require('../../utils/responses').getResponse;
 
//Obtenemos todos los usuarios
router.get("/getusers", async (req,res) => {
    const users = await User.find().populate('address');
    res.status(200).send(response('OK', users));
});
 
//Obtenemos usuarios por ID
router.get("/getusersById/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
      return res.status(400).send(response('Invalid user id'));
    }
    User.findOne({_id: req.params.id}, (err, user) =>{
        if(!user){
            res.status(404).send(response('User not found'));
        }else if(user){
            res.status(200).send(response('OK', user));
        }
    }).populate('address');
 
});
 
// Crear Usuario
router.post ("/createUsers", (req, res) => {
    let user = {
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        birthDate: req.body.birthDate,
        address: req.body.address
    }
 
    if(!user.address) {
        User.create(user, (err, newUser) => {
            if(err) {
                res.status(405).send("Invalid input");
            } else {
                res.status(201).send(response('CREATED', newUser));
            }
        })
    } else {
        Address.create(user.address, (err, newAddress) => {
            user.address = newAddress._id;
            User.create(user, (err, newUser) => {
                if(err) {
                    res.status(405).send("Invalid input");
                } else {
                    res.status(201).send(response('CREATED', newUser));
                }
            })
        });
    }
});
 
// Editar
router.put("/updateUsersById/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(response('Invalid user id'));
      }
 
    let user = {
        name: req.body.name,
        email: req.body.email,
        birthDate: req.body.birthDate
    }
 
    User.findOneAndUpdate({ _id: req.params.id }, user, {new: true}, (err, updatedUser) =>{
        if(!updatedUser){
            res.status(404).send(response('User not found'));
        }else if(updatedUser){
            Address.findOneAndUpdate({ _id: updatedUser.address }, req.body.address, {new: true}, () => {
                res.status(200).send(response('OK', updatedUser));
            })
        }
    })
});
 
// Borrar
router.delete("/deleteUsersById/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(response('Invalid user id'));
    }
 
    User.deleteOne({ _id: req.params.id }, (err, user) =>{
        if(user.deletedCount === 0){
            res.status(404).send(response('User not found'));
        }else if(user.deletedCount !== 0){
            res.status(200).send(response('OK'));
        }   
    });
});
 
module.exports = router;