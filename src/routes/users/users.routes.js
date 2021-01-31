const express = require("express");
const router = express.Router();
const User = require('../../models/models').User;
const Address = require('../../models/models').Address;
const response = require('../../utils/responses').getResponse;

//Obtenemos todos los usuarios
router.get("/getusers", async (req,res) => {
    const users = await User.find().populate('addresses');
    res.status(200).send(response('OK', users));
});

//Obtenemos usuarios por ID
router.get("/getusersById/:id", (req,res) => {

    const user = User.findOne({_id: req.params.id}, (err, user) =>{
        if(err){
            res.status(400).send(response('Invalid user id').populate('addresses'));
        }else if(!user){
            res.status(404).send(response('User not found'));
        }else if(user){
            res.status(200).send(response('OK', user));
        }
    });
});

// Crear Usuario
router.post ("/createUsers", (req,res) => {

    const {
        name, email, birthDate, street, state, city, country, zip
    } = req.body
    Address.create({
        street, state, city, country, zip
    }).then (newAddres => {
        User.create({
            name, email, birthDate, address: newAddres._id
        }).then (newUser =>  {
            res.status(201).send(response('CREATED', newUser))
        })
    })
    .catch(err => res.status(405).send("Invalid input"));
})


// Editar
router.put("/updateUsersById/:id", (req,res) => {

    const {
        name, email, birthDate, street, state, city, country, zip
    } = req.body

    User.findOneAndUpdate({ _id: req.params.id },{name, email, birthDate}, {new: true}, (err, user) =>{
        if(err){
            res.status(400).send(response('Invalid user id'));
        }else if(!user){
            res.status(404).send(response('User not found'));
        }else if(user){
            Address.findOneAndUpdate({ _id: user.address }, {street, state, city, country, zip}, {new: true}, result =>{
                res.status(200).send(response('OK', user));
            }).catch(err);
        }
    }).catch(err);
})

// Borrar
router.delete("/deleteUsersById/:id", (req,res) => {
    
    User.deleteOne({ _id: req.params.id }, (err, user) =>{
        if(err){
            res.status(400).send(response('Invalid user id'));
        }else if(user.deletedCount === 0){
            res.status(404).send(response('User not found'));
        }else if(user.deletedCount !== 0){
            res.send(response('OK'));
        }   
    })
})

module.exports = router;