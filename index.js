const express = require('express');
const app = express();
const userRoutes = require("./src/routes/users/users.routes"); 
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const url = "mongodb+srv://admin:admin@cluster0.xvhte.mongodb.net/db?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use(express.json());

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ');
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.listen(process.env.PORT || 5000);

module.exports = app;