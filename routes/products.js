const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const{
    getAllProducts,
    getProduct,
    postProduct,
    editProduct,
    deleteProduct
}=require('../controllers/products')

router.route('/').get(getAllProducts)
router.post('/',upload.single('avatar'),postProduct)
router.route('/:id').get(getProduct).patch(editProduct).delete(deleteProduct)

module.exports = router