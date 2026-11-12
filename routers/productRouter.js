const router = require('express').Router();

const {addProduct, getOneProduct, getAllProduct, deleteProduct, updateProduct} = require('../controllers/productController')

const upload = require('../middleware/multer')


router.post('/addproduct', upload.single('productImage'), addProduct);
router.get('/allproduct', getAllProduct);
router.get('/getone/:id', getOneProduct);
router.patch('/updateproduct/:id', upload.single('productImage'), updateProduct);
router.delete('/deleteproduct/:id', deleteProduct)

module.exports = router