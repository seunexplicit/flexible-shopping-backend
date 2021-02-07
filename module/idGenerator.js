module.exports = function (idLength, idNumbers=null){
	if(!idNumbers){
		return idGenerator(idLength);
	}
	else{
		ids = [];
		for(let r = 0; r<idNumbers; r++){
			ids.push(idGenerator(idLength));
		}

		return ids;
	}
}

function idGenerator(idLength){
	let id = '';
	for(let j = 0; j<idLength; j++){
		id+=Math.round(Math.random()*10);
	}
	return id;
}