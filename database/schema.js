function schema(){
	return `
		/********************************************************************************
			Drop Tables
		/********************************************************************************************/
		DROP TABLE IF EXISTS Seller;
		DROP TABLE IF EXISTS Product;
		DROP TABLE IF EXISTS Varieties;
		DROP TABLE IF EXISTS Order;
		DROP TABLE IF EXISTS Image;
		DROP TABLE IF EXISTS Tag;
		/*********************************************************************************************
		Create Tables
		***********************************************************************************************/

		CREATE TABLE Seller(
			sellerId char(20) NOT NULL,
			firstName char(50) NOT NULL,
			password char(50) NOT NULL,
			lastName char(50),
			userName char(50) NOT NULL,
			storeName varchar(200) NOT NULL,
			createdDate DATETIME NOT NULL,
			deliver BOOLEAN NOT NULL DEFAULT 1,
			address varchar(200),
			PRIMARY KEY (sellerId)
		);
		CREATE TABLE Image(
			url char(50) NOT NULL,
			varietyId char(20) NOT NULL,
			FOREIGN KEY (varietyId) REFERENCES Product(varietyId)

		);
		CREATE TABLE Product(
			productId char(20) NOT NULL,
			name varchar(200) NOT NULL,
			description text(500) NOT NULL,
			updatedDate datetime,
			category enum(Clothing, Electronics, Computing, Phones, Supermarket, Office) NOT NULL,
			createdDate datetime NOT NULL,
			PRIMARY KEY (productId),
			FOREIGN KEY sellerId REFERENCES Seller(sellerId)
		);
		CREATE TABLE Varieties(
			varietyId char(20) NOT NULL,
			size int,
			color char(20),
			quantity int NOT NULL,
			price int NOT NULL,
			productId char(20) NOT NULL,
			PRIMARY KEY (varietyId),
			FOREIGN KEY (productId) REFERENCES Product(productId)

		)
		CREATE TABLE Tag(
			tag char(50) NOT NULL,
			productId char(20) NOT NULL,
			FOREIGN KEY (productId) REFERENCES Product(productId)
		)
		CREATE TABLE Order(
			orderId char(20)  NOT NULL,
			varietyId char(20) NOT NULL,
			quantity int NOT NULL,
			status enum(pending, moving, received) NOT NULL,
			PRIMARY KEY (orderId),
			FOREIGN KEY (varietyId) REFERENCES Varieties(varietyId)
		)
	`
}

module.exports = schema;