const express = require('express')

const category = require('../models/category')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const product = require('../models/product')
router.get('/getcategories', fetchuser, async (req, res) => {
    const categoryList = await category.find({ user: req.user.id })
    if (categoryList) {
        res.json(categoryList)
        console.log(categoryList);
        
    }
})


router.post('/addcategory', fetchuser, async (req, res) => {
    const { name } = req.body
    try {
        const categoryexist = await category.findOne({ user: req.user.id, name: name })
        if (categoryexist) {
            res.json("category exist")
        }
        else {
            if (name) {
                let categor = await category.create({ name: name, user: req.user.id })
                res.json(categor)
            }
            else {
                res.status(400).json("error")
            }
        }
    }
    catch(error) {
        res.json(error)
     }
})


router.delete('/deletecategory/:name', fetchuser, async (req, res) => {
    const categor = await category.findOne({ name: req.params.name, user: req.user.id })
    if (categor) {
        try {
            let products = await product.find({ category: req.params.name, user: req.user.id }).deleteMany()
            categor = await category.findOneAndDelete({ name: req.params.name, user: req.user.id })
            res.json({ "success": "successfully deleted" })
        }
        catch (error) {
            res.send(error)
        }
    }
    else {
        res.status(400).json({ "error": "category doesnot exist" })
    }
    console.log(categor);

})


router.patch('/updatecategory/:name', fetchuser, async (req, res) => {
    const categor = await category.findOne({ name: req.params.name, user: req.user.id })
    if (categor) {
        try {
            let changeProductCategory = await product.updateMany({user:req.user.id,category:req.params.name},{$set:{category:req.body.name}})  //updateMany({ category: req.params.name,user:req.body.id }, { category: req.body.name })   
            console.log(changeProductCategory);
            let newCategory = await category.findOneAndUpdate({ name: req.params.name, user: req.user.id }, { name: req.body.name })
            res.json({ "success": "Successfully update" })
        }
        catch (error) {
            res.json(error)
        }
    }
    else {
        res.status(400).json({ "error": "Category doesnt exist" })
    }
})




module.exports = router