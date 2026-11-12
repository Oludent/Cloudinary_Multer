const {Product} = require('../models');
const fs = require('fs')

exports.addProduct = async (req, res)=>{
    try {
        const {productName, price, stock} = req.body;
        const file = req.file.path

        const prod = await Product.findOne({where: {productName}})

        if (prod) {
            return res.status(400).json({
                message: `Product already exist!`
            })
        }

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        })

        res.status(200).json({
            message: `Product added successfully!`,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} 

exports.getAllProduct = async (req, res) => {
    try {
        const allProd = await Product.findAll()
        res.status(200).json({
            message: `All products found and the total is: ${allProd.length}`,
            data: allProd
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneProduct = async (req, res) =>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(id, {attributes: ['productName', 'price', 'productImage']})
        if(!product){
            return res.status(404).json({
                message:`Product not found`
            })
        } 
        res.status(200).json({
            message: `Product found successfully`,
            data: product
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}

exports.updateProduct = async (req, res)=>{
    try {
        const {id} = req.params
        const {productName, price, stock} = req.body
        const prod = await Product.findByPk(id)
        if(!prod){
            return res.status(404).json({
                message: `Product not found`
            })
        }

        const data = {
            productName,
            price,
            stock
        }

        if(req.file){
            const oldFilePath = prod.productImage
            fs.unlinkSync(oldFilePath);
            data.productImage = req.file.path
        }

        await prod.update(data)
        res.status(200).json({
            message: `Product updated succesfully!`
        })
    } catch (error) {
          res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res)=>{
    try {
        const id = req.params.id
        const prod = await Product.findByPk(id)
        if(!prod){
            return res.status(404).json({
                message: `Product not found`
            })
        }
        await prod.destroy()
        res.status(200).json({
            message: `Product deleted successfully`
        })

    } catch (error) {
          res.status(500).json({
            message: error.message
        })
    }
}