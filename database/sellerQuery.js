const idGenerator = require('../module/idGenerator');
module.exports = (connections)=>{
	return {
		addSeller:(sellerData)=>{
			return new Promise((resolve, reject)=>{
				sellerData = JSON.parse(JSON.stringify(sellerData));
				let keys = Object.keys(sellerData);
				let values = Object.values(sellerData);
				keys.push('createdDate'); values.push(new Date());
				let seller = uniqueIdSellerCreation(connections, keys, values);
				if(seller.err) reject(seller.err)
				else resolve(seller.result);
			});
			
		},
		getOneSeller:(sellerId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Seller WHERE sellerId = ?';
				connections.query(query, sellerId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		getAllSeller:()=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Seller';
				connections.query(query, sellerId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		updateSeller:(sellerId, updatedValue)=>{
			return new Promise((resolve, reject)=>{
				updatedValue = JSON.parse(JSON.stringify(updatedValue));
				let keys = Object.keys(updatedValue);
				let values = Object.values(updatedValue);
				let query = `UPDATE Seller SET ${keys.join(' = ?,')} = ? WHERE sellerId = ?`;
				connections.query(query, [...values, sellerId], (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				})
			})
		},
		deleteSeller:(sellerId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'DELETE FROM Seller WHERE sellerId = ?';
				connections.query(query, sellerId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		}
	}
}

function uniqueIdSellerCreation(connections, keys, values){
	let sellerId = idGenerator(17);
	keys.push('sellerId');
	let query = `INSERT INTO Seller(${keys.join(' ')}) VALUES ${'? '.repeat(keys.length)}`
	connections.query('Select * FROM Seller WHERE sellerId = ?', sellerId, (err, result, fields)=>{
		if(err) return {err:err1, result:null};;
		else{
			if(result.length){
				return uniqueIdSellerCreation(connections, keys, values)
			}
			else{
				connections.query(query, [...values, sellerId], (err1, result1, fields1)=>{
					if(err1){
						return {err:err1, result:null};
					}
					else{ return {err:null, result:result1}; }
				});
			}
		}
	});
	
}