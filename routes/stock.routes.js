const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/test',stockController.test);
router.get('/findAll',stockController.findAll);
router.get('/findByKey/:key/:val',(req,res)=>{
    stockController.findByKey(req,res);
});

/* router.post('/create',productController.create);
router.get('/stocks',productController.getAll);
router.post('/update',productController.update);
 */
module.exports = router;