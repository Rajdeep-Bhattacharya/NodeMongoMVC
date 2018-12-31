const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/test',stockController.test);
router.get('/findAll',stockController.findAll);
router.get('/findBySymbol/:symbol',(req,res)=>{
    stockController.findBySymbol(req,res);
});
router.get('/findByDate/:date',(req,res)=>{
    stockController.findByDate(req,res);
});
/* router.post('/create',productController.create);
router.get('/stocks',productController.getAll);
router.post('/update',productController.update);
 */
module.exports = router;