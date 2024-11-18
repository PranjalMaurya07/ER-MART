
const express = require('express');
const router = express.Router(); 
const formidable = require('express-formidable');
const { auth, isAdmin } = require('../Middlewares/authMiddleware');
const { handleCreateProductsController, handleGetProductsController, handleGetSingleProductController, handleGetPhotoController, handleDeleteProductController, handleUpdateProductController, handleFilterProductController, handleCountProductController, handleProductListController, handleSearchProductController, handleSimilarProductController, handleProductCategoryController, handleBraintreeTokenController, handleBraintreePaymentController } = require('../controllers/productController');

// create-product
router.post('/create-product',auth,isAdmin,formidable(),handleCreateProductsController);

// update-product
router.put('/update-product/:pid',auth,isAdmin,formidable(),handleUpdateProductController);

// get-all-products
router.get('/get-products',handleGetProductsController);

// get-single-product
router.get('/get-single-product/:slug',handleGetSingleProductController);

// get-photo
router.get('/get-photo/:pid',handleGetPhotoController);

// delete-product
router.delete('/delete-product/:pid',handleDeleteProductController);

// filter-product
router.post("/product-filters", handleFilterProductController);

//product's count
router.get("/product-count", handleCountProductController);

//products per page
router.get("/product-list/:page", handleProductListController);

// search product
router.get("/search/:keyword",handleSearchProductController);

// similar products
router.get("/related-product/:pid/:cid",handleSimilarProductController);

// category wise product
router.get("/product-category/:slug",handleProductCategoryController);

//payment route token
router.get("/braintree/token", handleBraintreeTokenController);

//payments
router.post("/braintree/payment", auth, handleBraintreePaymentController);


module.exports = router;