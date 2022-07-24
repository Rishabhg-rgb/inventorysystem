const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userinventory"
    }
})

const product = mongoose.model('productSchema',productSchema)

module.exports = product
