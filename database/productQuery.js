const idGenerator = require('../module/idGenerator');
module.exports = (connections)=>{
	return {
		addProduct:(product)=>{
			return new Promise((resolve, reject)=>{
				let productData = JSON.parse(JSON.stringify(product));
				delete productData.varieties;
				let keys = Object.keys(productData);
				let values = Object.values(productData);
				keys.push('createdDate'); values.push(new Date()); 
				let product = uniqueIdProductCreation(connections, keys, values);
				if(product.err) reject(product.err)
				else resolve(product.result);
			});
			
		},
		getOneProduct:(productId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Product WHERE productId = ?';
				connections.query(query, productId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		getProductWithCategory:(category)=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Product WHERE category = ?';
				connections.query(query, category, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		getProductWithName:(name)=>{
			return new Promise((resolve, reject)=>{
				let query = `SELECT * FROM Product WHERE category LIKE %${name}%`;
				connections.query(query, category, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		getAllProducts:()=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Product';
				connections.query(query, productId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		updateProduct:(productId, updatedValue)=>{
			return new Promise((resolve, reject)=>{
				updatedValue = JSON.parse(JSON.stringify(updatedValue));
				let keys = Object.keys(updatedValue);
				keys.push('updatedDate');
				let values = Object.values(updatedValue);
				let query = `UPDATE Product SET ${keys.join(' = ?,')} = ? WHERE productId = ?`;
				connections.query(query, [...values, new Date(), productId], (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				})
			})
		},
		deleteProduct:(productId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'DELETE FROM Product WHERE productId = ?';
				connections.query(query, productId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		}
	}
}

function uniqueIdProductCreation(connections, keys, values){
	let productId = idGenerator(17);
	keys.push('productId');
	let query = `INSERT INTO Product(${keys.join(' ')}) VALUES ${'? '.repeat(keys.length)}`
	connections.query('Select * FROM Product WHERE productId = ?', productId, (err, result, fields)=>{
		if(err) return {err:err1, result:null};;
		else{
			if(result.length){
				return uniqueIdProductCreation(connections, keys, values)
			}
			else{
				connections.query(query, [...values, productId], (err1, result1, fields1)=>{
					if(err1){
						return {err:err1, result:null};
					}
					else{ return {err:null, result:result1}; }
				});
			}
		}
	});
	
}