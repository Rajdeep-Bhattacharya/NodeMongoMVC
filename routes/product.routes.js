const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/test',productController.test);
router.get('/findAll',productController.findAll);
router.get('/find/:symbol',(req,res)=>{
    productController.findBySymbol(req,res);
});

/* router.post('/create',productController.create);
router.get('/stocks',productController.getAll);
router.post('/update',productController.update);
 */
module.exports = router;