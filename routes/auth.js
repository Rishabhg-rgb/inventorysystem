const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "itsasecretkey"
router.post('/createuser',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        const salt = await bcrypt.genSalt(10)
        const secpass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass
        })
        const data = {
            user:{
                id:user._id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json(authtoken)
    }
    else{
        res.json("Error")
    }
})



router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    // let user = await User.findone({email:req.body.email})
    let user = await User.findOne({email:req.body.email})
    
    if(!user){
        return res.sendStatus(400).json("error")
    }
    const passwordCompare = await bcrypt.compare(password,user.password)
    if (!passwordCompare){
        return res.sendStatus(400).json("Error")
    }
    else{
        const data = {
            user:{
                id:user._id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json(authtoken)
        localStorage.setItem('auth-token',authtoken)
    }
})



router.patch('/update/:id',async(req,res)=>{
    let user = await User.findOne({_id:req.params.id})
    
    if (user){
        const {name,email,password} = req.body
        if (name && email && password){
            let passwordcompare = await bcrypt.compare(password,user.password)
            
        }
        else if(name&&email ){
            let user = await User.findByIdAndUpdate((req.params.id),{name:name,email:email})   
            res.json("succesfully change")
        }
        else if(name){
            let user = await User.findByIdAndUpdate((req.params.id),{name:name})   
            res.json("succesfully change")
        }
        else if(email){
            let user = await User.findByIdAndUpdate((req.params.id),{email:email})   
            res.json("succesfully change")
        }
        if (password){
            // console.log(user);
            
            // console.log(user);
            
            let passwordcompare = await bcrypt.compare(password,user.password)
            console.log(passwordcompare);
            if (passwordcompare){
                res.json("password same as previous")
            }
            else{
                const salt = await bcrypt.genSalt(10)
                const secpass = await bcrypt.hash(password,salt)
                // user = await User.create({
                //     name:req.body.name,
                //     email:req.body.email,
                //     password:secpass
                // })
                user = await User.findByIdAndUpdate((req.params.id),{password:secpass})   
                const data = {
                    user:{
                        id:user._id
                    }
                }
                const authtoken = jwt.sign(data,JWT_SECRET)
                res.json(authtoken)
            }
            // console.log(passwordcompare)
        }
        // if(passcompare){
        //     return res.json("password does not change")
        // }
        // else{
        //     let user = await User.findByIdAndUpdate((req.params.id),{})
        // }
    }
})

module.exports = router