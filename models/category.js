const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userinventories'
    }
})

const category = mongoose.model('categorySchema',categorySchema)

module.exports = category
