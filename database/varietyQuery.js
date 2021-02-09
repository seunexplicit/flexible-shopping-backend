const idGenerator = require('../module/idGenerator');
module.exports = (connections)=>{
	return {
		addNewVariety:(varieties, productId)=>{
			keys = ['size', 'color', 'quantity', 'price', 'productId'];
			values = [];
			for(let j = 0; j<varieties.length; j++){
				varieties[j] = JSON.parse(JSON.stringify(varieties));
				let value = [];
				for(let i = 0; i<keys.length; i++){
					if(varieties[j][keys[j]]){
						value.push(varieties[j][keys[i]])
					}
					else{ value.push(null); }
				}
				values.push(value);

			}
			keys.push('varietyId');
			let variety = uniqueIdVarietyCreation(connections, keys, values);
			if(variety.err) reject(variety.err)
			else resolve(variety.result);
		},
		getVariety:(productId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'SELECT * FROM Varieties WHERE productId = ?';
				connections.query(query, productId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		},
		updateVariety:(updatedValue, varietyId)=>{
			updatedValue = JSON.parse(JSON.stringify(updatedValue));
			let keys = Object.keys(updatedValue);
			let values = Object.values(updatedValue);
			let query = `UPDATE Varieties SET ${keys.join(' = ?,')} = ? WHERE varietyId = ?`;
			connections.query(query, values, (err, result, fields)=>{
				if(err) reject(err)
				else resolve(result)
			})
		},
		deleteVariety:(varietyId)=>{
			return new Promise((resolve, reject)=>{
				let query = 'DELETE FROM Varieties WHERE varietyId = ?';
				connections.query(query, varietyId, (err, result, fields)=>{
					if(err) reject(err)
					else resolve(result)
				});
			})
		}
	} 
}

function uniqueIdVarietyCreation(connections, keys, values){
	let varietiesId = idGenerator(15, values.length);
	let query = `INSERT INTO Product(${keys.join(' ')}) VALUES ${'? '.repeat(keys.length)}`
	connections.query(`SELECT * FROM Varieties WHERE varietyId IN (${varietiesId.join(', ')})`, (err, result, fields)=>{
		if(err) return {err:err1, result:null}
		else{
			if(result.length){
				return uniqueIdProductCreation(connections, keys, values)
			}
			else{
				for(let k = 0; k<values.length; k++){
					values[k].push(varietiesId[k]);
				}
				connections.query(query, values, (err1, result1, fields1)=>{
					if(err1){
						return {err:err1, result:null};
					}
					else{ return {err:null, result:result1}; }
				});
			}
		}
	});
}