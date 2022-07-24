const express = require('express')

const category = require('../models/category')
const product = require('../models/product')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')

router.get('/getproducts',fetchuser, async (req, res) => {
    let products = await product.find({user:req.user.id})
    if (products) {
        res.json(products)
    }
    else {
        res.json({ "sorry": "no Products" })
    }
})

router.get('/getparticularproducts/:category',fetchuser,async(req,res)=>{
    let products = await product.find({user:req.user.id,category:req.params.category})
    if (products) {
        res.json(products)
    }
    else {
        res.json({ "sorry": "no Products" })
    }
})


router.post('/addproduct',fetchuser, async (req, res) => {
    const { name, desc, productCompany, productCategory,productPrice } = req.body
    categoryCheck = await category.findOne({ name: productCategory,user:req.user.id })
    if (!categoryCheck) {
        res.json({ "error": "Category doesnt exist" })
    }
    else {
        if (name && desc && productCompany && productCategory&&productPrice) {
            let prod = await product.create({ name: name, description: desc, category: productCategory, company: productCompany,price:productPrice,user:req.user.id})
            res.json(prod)
        }
        else {
            res.json({ "error": "Invalid" })
        }
    }
})

router.delete('/deleteproduct/:id',fetchuser, async (req, res) => {
    productCheck = await product.findOne({ _id: req.params.id })
    if (!productCheck) {
        res.json({ "error": "product doesnt exist" })
    }
    else{
        productCheck = await product.findOneAndDelete({ _id: req.params.id })
        res.json({"succes":"Successfully deleted"})
    }
    
    
})


router.patch('/updateproduct/:id',fetchuser,async(req,res)=>{
    const { name, desc, productCompany, productCategory,productPrice } = req.body
    const productCheck = await product.findOne({_id:req.params.id})
    console.log(productCheck);
    
    if (productCheck){
        const newprod = new product({
            _id:req.params.id,
            name:name,
            description:desc,
            company:productCompany,
            category:productCategory,
            price:productPrice
        })
        let newProduct = await product.findByIdAndUpdate({_id:req.params.id},{$set:newprod},{upsert:true})
        res.json("success")
    }
    else{
        res.send("product not exist")
    }
})

module.exports = router