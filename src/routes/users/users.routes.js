const express = require("express");
const router = express.Router();
const User = require('../../models/models').User;
const response = require('../../utils/responses').getResponse;

//Obtenemos todos los usuarios
router.get("/getusers", async (req,res) => {
    const users = await User.find();
    res.status(200).send(response('OK', users));
});

//Obtenemos usuarios por ID
router.get("/getusersById/:id", (req,res) => {

    const user = User.findOne({_id: req.params.id}, (err, user) =>{
        if(err){
            res.status(400).send(response('Invalid user id'));
        }else if(!user){
            res.status(404).send(response('User not found'));
        }else if(user){
            res.status(200).send(response('OK', user));
        }
    });
});

// Crear Usuario
router.post ("/createUsers", (req,res) => {

    const NEW_USER = new User ({
        name: req.body.name, 
        email: req.body.email,
        birthDate: req.body.birthDate,
    });
     NEW_USER.save().then(createdUser => {
        res.status(201).send(response('CREATED', NEW_USER));
    })
    .catch(err => {
        res.status(405).send("Invalid input");
    });
})


// Editar
router.put("/updateUsersById/:id", (req,res) => {

    const user = User.findOne({ _id: req.params.id }, (err, user) =>{
        if(err){
            res.status(400).send(response('Invalid user id'));
        }else if(!user){
            res.status(404).send(response('User not found'));
        }else if(user){
            if(req.body.name){
                user.name = req.body.name;
            }else if(req.body.email){
                user.email = req.body.email;
            }else if(req.body.birthDate){
                user.birthDate = req.body.birthDate;
            }
            user.save();
            res.status(200).send(response('OK', user));
        }
    });
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