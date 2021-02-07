module.exports = function(seller){

	seller.get('/', verification, ()=>{
	})

	seller.post('/post-seller', verification, ()=>{

	})
	seller.get('/:userId', verification, ()=>{

	});
	seller.put('/edit-user/:userId', verification, ()=>{

	});
	seller.delete('/:userId', verification, ()=>{
		
	});
}