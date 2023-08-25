const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect mySql Database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "moc_user",
	port: 3306,
});

//check database connection
db.connect((err) => {
	if (err) {
		console.log(err, "db connection error");
	}
	console.log("Database Connected!!....");
});

//<------------------------------------------ USER Methods ---------------------------------------------->
//get All USER data
app.get("/user", (req, res) => {
	try {
		let querr = `SELECT * FROM user ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Users Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single USER by ID
app.get("/user/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM user where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get User By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post USER data
app.post("/user", (req, res) => {
	try {
		let empId = req.body.EMP_ID;
		let empName = req.body.EMP_NAME;
		let domainName = req.body.DOMAIN_NAME;
		let emailID = req.body.EMAIL_ID;
		let site = req.body.SITE;
		let plant = req.body.PLANT;
		let mocRole = req.body.MOC_ROLE;
		let active = req.body.ACTIVE;

		let querr = `insert into user(EMP_ID,EMP_NAME,DOMAIN_NAME,EMAIL_ID,SITE,PLANT,MOC_ROLE,ACTIVE) value('${empId}','${empName}','${domainName}','${emailID}','${site}','${plant}','${mocRole}','${active}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update USER data
app.put("/user/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let empId = req.body.EMP_ID;
		let empName = req.body.EMP_NAME;
		let domainName = req.body.DOMAIN_NAME;
		let emailID = req.body.EMAIL_ID;
		let site = req.body.SITE;
		let plant = req.body.PLANT;
		let mocRole = req.body.MOC_ROLE;
		let active = req.body.ACTIVE;

		let querr = `update user set EMP_ID = '${empId}', EMP_NAME = '${empName}', DOMAIN_NAME = '${domainName}', EMAIL_ID = '${emailID}', SITE = '${site}', PLANT = '${plant}', MOC_ROLE = '${mocRole}', ACTIVE = '${active}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete USER
app.delete("/user/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from user where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of user ID ${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//<------------------------------------------ COMPANY Methods ---------------------------------------------->
//get All USER data
app.get("/company", (req, res) => {
	try {
		let querr = `SELECT * FROM company ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Company Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single USER by ID
app.get("/company/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM company where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get Comapny By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post USER data
app.post("/company", (req, res) => {
	try {
		let companyCode = req.body.COMPANY_CODE;
		let companyName = req.body.COMPANY_NAME;
		let address = req.body.ADDRESS;
		let pincode = req.body.PINCODE;
		let active = req.body.ACTIVE;

		let querr = `insert into company(COMPANY_CODE,COMPANY_NAME,ADDRESS,PINCODE,ACTIVE) value('${companyCode}','${companyName}','${address}','${pincode}','${active}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update USER data
app.put("/company/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let companyCode = req.body.COMPANY_CODE;
		let companyName = req.body.COMPANY_NAME;
		let address = req.body.ADDRESS;
		let pincode = req.body.PINCODE;
		let active = req.body.ACTIVE;

		let querr = `update company set COMPANY_CODE = '${companyCode}', COMPANY_NAME = '${companyName}', ADDRESS = '${address}', PINCODE = '${pincode}', ACTIVE = '${active}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete USER
app.delete("/company/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from company where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of user ID ${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//<------------------------------------------ PLANT Methods ---------------------------------------------->
//get All PLANT data
app.get("/plant", (req, res) => {
	try {
		let querr = `SELECT * FROM plant ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Plant Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single PLANT by ID
app.get("/plant/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM plant where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get plant By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post PLANT data
app.post("/plant", (req, res) => {
	try {
		let plantCode = req.body.PLANT_CODE;
		let plantName = req.body.PLANT_NAME;
		let plantDisplayName = req.body.PLANT_DISPLAY_NAME;
		let siteCode = req.body.SITE_CODE;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `insert into plant(PLANT_CODE,PLANT_NAME,PLANT_DISPLAY_NAME,SITE_CODE,DESCRIPTION,ACTIVE) value('${plantCode}','${plantName}','${plantDisplayName}','${siteCode}','${description}','${active}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update PLANT data
app.put("/plant/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let plantCode = req.body.PLANT_CODE;
		let plantName = req.body.PLANT_NAME;
		let plantDisplayName = req.body.PLANT_DISPLAY_NAME;
		let siteCode = req.body.SITE_CODE;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `update plant set PLANT_CODE = '${plantCode}', PLANT_NAME = '${plantName}', PLANT_DISPLAY_NAME = '${plantDisplayName}', SITE_CODE = '${siteCode}', DESCRIPTION = '${description}', ACTIVE = '${active}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete PLANT
app.delete("/plant/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from plant where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of plant ID ${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//<------------------------------------------ ROLE Methods ---------------------------------------------->
//get All ROLE data
app.get("/role", (req, res) => {
	try {
		let querr = `SELECT * FROM role ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Role Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single ROLE by ID
app.get("/role/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM role where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get Role By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post ROLE data
app.post("/role", (req, res) => {
	try {
		let roleCode = req.body.ROLE_CODE;
		let roleName = req.body.ROLE_NAME;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `insert into role(ROLE_CODE,ROLE_NAME,DESCRIPTION,ACTIVE) value('${roleCode}','${roleName}','${description}','${active}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update ROLE data
app.put("/role/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let roleCode = req.body.ROLE_CODE;
		let roleName = req.body.ROLE_NAME;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `update role set ROLE_CODE = '${roleCode}', ROLE_NAME = '${roleName}', DESCRIPTION = '${description}', ACTIVE = '${active}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete ROLE
app.delete("/role/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from role where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of role ID${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//<------------------------------------------ SEGMENT Methods ---------------------------------------------->
//get All SEGMENT data
app.get("/segment", (req, res) => {
	try {
		let querr = `SELECT * FROM segment ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Segments Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single SEGMENT by ID
app.get("/segment/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM segment where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get Segment By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post SEGMENT data
app.post("/segment", (req, res) => {
	try {
		let segmentCode = req.body.SEGMENT_CODE;
		let segmentName = req.body.SEGMENT_NAME;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `insert into segment(SEGMENT_CODE,SEGMENT_NAME,DESCRIPTION,ACTIVE) value('${segmentCode}','${segmentName}','${description}','${active}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update SEGMENT data
app.put("/segment/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let segmentCode = req.body.SEGMENT_CODE;
		let segmentName = req.body.SEGMENT_NAME;
		let description = req.body.DESCRIPTION;
		let active = req.body.ACTIVE;

		let querr = `update segment set SEGMENT_CODE = '${segmentCode}', SEGMENT_NAME = '${segmentName}', DESCRIPTION = '${description}', ACTIVE = '${active}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete SEGMENT
app.delete("/segment/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from segment where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of Segment ID ${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//<------------------------------------------ SITE Methods ---------------------------------------------->
//get All SITE data
app.get("/site", (req, res) => {
	try {
		let querr = `SELECT * FROM site ORDER BY ID ASC`;
		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "All Sites Data",
					data: results,
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get single SITE by ID
app.get("/site/:ID", (req, res) => {
	try {
		let querrID = req.params.ID;
		let querr = `SELECT * FROM site where id = ${querrID}`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				res.send({
					message: "Get Site By ID",
					data: results,
				});
			} else {
				res.send({ message: "ID Not Found" });
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//post SITE data
app.post("/site", (req, res) => {
	try {
		let siteCode = req.body.SITE_CODE;
		let siteName = req.body.SITE_NAME;
		let siteDisplayName = req.body.SITE_DISPLAY_NAME;
		let active = req.body.ACTIVE;
		let description = req.body.DESCRIPTION;
		let segmentCode = req.body.SEGMENT_CODE;
		let companyCode = req.body.COMPANY_CODE;

		let querr = `insert into site(SITE_CODE,SITE_NAME,SITE_DISPLAY_NAME,ACTIVE,DESCRIPTION,SEGMENT_CODE,COMPANY_CODE) value('${siteCode}','${siteName}','${siteDisplayName}','${active}','${description}','${segmentCode}','${companyCode}')`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({ message: "Data Added Successfully", data: results });
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//update SITE data
app.put("/site/:ID", (req, res) => {
	try {
		let uID = req.params.ID;
		let siteCode = req.body.SITE_CODE;
		let siteName = req.body.SITE_NAME;
		let siteDisplayName = req.body.SITE_DISPLAY_NAME;
		let active = req.body.ACTIVE;
		let description = req.body.DESCRIPTION;
		let segmentCode = req.body.SEGMENT_CODE;
		let companyCode = req.body.COMPANY_CODE;

		let querr = `update site set SITE_CODE = '${siteCode}', SITE_NAME = '${siteName}', SITE_DISPLAY_NAME = '${siteDisplayName}', ACTIVE = '${active}', DESCRIPTION = '${description}', SEGMENT_CODE = '${segmentCode}', COMPANY_CODE = '${companyCode}' where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;
			res.send({
				message: `Data Updated Successfully of ID ${uID}`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//delete SITE
app.delete("/site/:ID", (req, res) => {
	try {
		let uID = req.params.ID;

		let querr = `delete from site where id = '${uID}'`;

		db.query(querr, (err, results) => {
			if (err) throw err;

			res.send({
				message: `Data of user ID ${uID} Deleted Successfully`,
				data: results,
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.listen(3000, () => {
	console.log("server is running on PORT 3000");
});
