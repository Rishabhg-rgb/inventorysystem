const jwt  = require('jsonwebtoken')
const JWT_SECRET = "itsasecretkey"

const fetchuser = (req,res,next)=>{
    const authtoken = req.header('auth-token')
    if(!authtoken){
        res.status(401).send({error:"Please authenticate first"})
    }
    
    try{
        const data = jwt.verify(authtoken,JWT_SECRET)    
        req.user = data.user
        
        next()
    }
    catch(error){
        res.status(401).json({error:"authtenticate first"})
    }
}
// router.post('/login',async(req,res)=>{
//     const {email,password} = req.body
//     // let user = await User.findone({email:req.body.email})
//     let user = await User.findOne({email:req.body.email})
    
//     if(!user){
//         return res.sendStatus(400).json("error")
//     }
//     const passwordCompare = await bcrypt.compare(password,user.password)
//     if (!passwordCompare){
//         return res.sendStatus(400).json("Error")
//     }
//     else{
//         res.json({"Success":"Loggedin"})
//     }
// })
module.exports = fetchuser