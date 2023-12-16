const jwt = require("jsonwebtoken");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("Hello world from the server router part");
});

// registration route 🤩🤩🤩🤩🤩

router.post("/register",async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if(!name || !email || !phone || !work || !password || !cpassword ){
        return res.status(422).json({error: "plz filles  the field properly"});
    };

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: "Email already exists"});
        }else if(password != cpassword){
            return res.status(422).json({error: "password are not matching"});   
        }else{
            const user = new User({ name, email, phone, work, password, cpassword });
       // password hashing
            await user.save();
    
            res.status(201).json({message: "user registered successfuly"});
        }
    
    }catch(err) { console.log(err) };   
});

// login route 🤩🤩🤩🤩🤩

router.post("/signin", async (req, res) => {
//   console.log(req.body);
//   res.json({message: "awesome"});

  try{
    const { email, password } = req.body;

    if(!email || !password){
       res.status(400).json({error: "plz Filled the data"});
    }

    const userLogin = await User.findOne({email: email});

    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);

        const token = await userLogin.generateAuthToken();

        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        if(!isMatch){
            res.status(400).json({error: "user error"});
        }else{
            res.json({message: "user Signin Successfully"});
        }
    }else{
            res.status(400).json({error: "Invalid Credientials"});
    }
  }catch(err){
   console.log(err);
  }
});

router.get("/about", authenticate , (req, res) => {
    // console.log("Hello About from the server");
    res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) =>{
    // console.log("Hello Contact from the server");
    res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
     try{

        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            console.log("error in contact form");
           return res.json({error: "plz filled the contact form"});
        }

        const usercontact = await User.findOne({_id:req.userID});

        if(usercontact){
            const userMessage = await usercontact.addMessage(name, email, phone, message);
            await usercontact.save();
            res.status(201).json({message: "user Contact successfully"});
        }

     }catch(e){
        console.log(e);
     }
});

router.get("/logout", (req, res) => {
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User Logout');
});



module.exports = router;









// router.post("/register", (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body

//     if(!name || !email || !phone || !work || !password || !cpassword ){
//         return res.status(422).json({error: "plz filles  the field properly"});
//     };
    
//     User.findOne({email: email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exists"});
//         }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user.save().then(() => {
//         res.status(201).json({message: "user registered successfuly"});
//       }).catch((err) => {
//         res.status(500).json({error: "Failed to registered"});

//       }).catch(err => { console.log(err) });

//     })
// })
