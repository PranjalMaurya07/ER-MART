const express = require('express');
const { auth, isAdmin } = require('../Middlewares/authMiddleware');
const { handleCategoryController, handleUpdateCategoryController, handleAllCategoryController, handleSingleCategoryController, handleDeleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();

// create-category
router.post('/create-category',auth,isAdmin,handleCategoryController);

// update-category
router.put('/update-category/:id',auth,isAdmin,handleUpdateCategoryController);

// get-category
router.get('/category',handleAllCategoryController);

// get-single-category
router.get('/single-category/:slug',handleSingleCategoryController);

// delete-category
router.delete('/delete-category/:id',auth,isAdmin,handleDeleteCategoryController);


module.exports = router;