
var express = require('express');
var router = express.Router();
module.exports = function(connections){

	router.get('/', ()=>{
	})

	router.post('/post-seller',  (req, res)=>{
			console.log(req.body)
			res.status(200).send('posted!');
	})
	router.get('/:userId', ()=>{

	});
	router.put('/edit-user/:userId', ()=>{

	});
	router.delete('/:userId', ()=>{
	});

	return router;
}