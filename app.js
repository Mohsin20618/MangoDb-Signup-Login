const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port ||5000
const mongoose = require('mongoose');
const cors = require("cors");
app.use(cors(["localhost:3000", "localhost:5000"]))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'web/build')))
mongoose.connect('mongodb+srv://Mohsin:Mohsin20618@cluster0.tdyk5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const User = mongoose.model('User', { 
    name: String,
    email: String,
    password:String, 
    Created:{ type: Date, default: Date.now },
})

app.post('/api/v1/login', (req, res) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log("req.body: ", req.body);


    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                if (user.password === req.body.password) {
                    res.send(user);

                } else {
                    res.send("Authentication fail");
                }

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
        console.log(req.body)
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    newUser.save(() => {
        console.log("data saved")
        res.send('profile created')
    })}
})
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/profile', (req, res) => {
//     User.find({},(err,data)=>{
//         if(err){
//             res.status(500).send('error in etting database')
//         }
//         else{
//             res.send(data)
//         }
//     });
    
// })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
