var express = require('express');
var router = express.Router();
const productQuery = require('../database/productQuery');
const varietyQuery = require('../database/varietyQuery');

/* GET users listing. */
function productRoute(connections){
  router.get('/', function(req, res, next) {
    try{
      productQuery(connections).getAllProducts().then(
        (result)=>{res.status(200).json(result)},
        (err)=>{next(err)});

    }
    catch(err){
    		next(err)
    }
  });

  router.get('/:productId', function(req,res, next){
  	try{
      let response = {};
      productQuery(connections).getOneProduct(req.params.productId)
      .then(
        (result)=>{
          response.product = result;
          return varietyQuery(connections).getVariety(req.params.productId);
        })
      .then((result)=>{ response.varieties = result; res.status(200).json(response) })
      .catch((err)=>{next(err)})
    }
    catch(err){
    		next(err)
    }
  });

  router.post('/', function(req, res, next){
    try{
      let response = {};
      productQuery(connections).addProduct(req.body)
      .then((result)=>{
        response.product = result;
        return varietyQuery(connections).addNewVariety(req.body.varieties, result.productId);
      })
      .then((result)=>{ response.varieties = result; res.status(200).json(response) })
      .catch((err)=>{ next(err)});
    }
    catch(err){
        next(err)
    }
  });

  router.put('/:productId', function(req, res, next){
  	try{
      productQuery(connections).updateProduct(req.params.productId, req.body)
      .then(
        (result)=>{res.status(200).json(result)},
        (err)=>{next(err)})
    }
    catch(err){
    		next(err)
    }
  });

  return router;
}

module.exports = productRoute;