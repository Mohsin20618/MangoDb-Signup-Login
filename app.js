const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT ||5000
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose');
const cors = require("cors");
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
UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
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

                bcrypt.compare(req.body.password, user.password, function(error, isMatch) {
                    if (error) {
                      throw error
                    } else if (!isMatch) {
                      console.log("Password doesn't match!")
                      res.send('Password doesnt match!')
                    } else {
                        res.send(user)
                      console.log("Password matches!")
                    }
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
