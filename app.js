const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT ||5000
const mongoose = require('mongoose');
const cors = require("cors");
var bcrypt = require("bcrypt-inzi")
app.use(cors(["localhost:3000", "localhost:5000"]))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'web/build')))
mongoose.connect('mongodb+srv://Mohsin:Mohsin20618@cluster0.tdyk5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const UserSchema = mongoose.Schema({ 
    name: String,
    email: String,
    password:String, 
    Created:{ type: Date, default: Date.now },
})

const User =mongoose.model("User", UserSchema)

app.post('/api/v1/login', (req, res) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                 bcrypt.varifyHash(req.body.password, user.password).then(result => {
                    if (result) {
                        console.log("Password matches!");
                        res.send(user)
                    } else {
                      console.log("Password doesn't match!")
                      res.send('Password doesnt match!')
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }

    })
})
app.post('/api/v1/signup', (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        console.log("required field missing")
        res.status(403).send("required field missing")
        return;
    }
    else{
      bcrypt.stringToHash(req.body.password).then(hash => {
        console.log("hash: ", hash);
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:hash
    })})
    newUser.save(() => {
        console.log("data saved")
        res.send('profile created')
    })}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
