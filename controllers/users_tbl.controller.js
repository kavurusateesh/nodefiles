const db = require("../models");
const User = db.users_tbl;


var jwt = require("jsonwebtoken");
var encryption = require('../helpers/Encryption');
const dbConfig = require("../config/db.config.js");
const passport = require('passport');

require('../config/passport')(passport);

exports.login = function (req, res) {
	console.log('test chandra123');
    passport.authenticate('local', function (err, admin, info) {
		console.log('test chandra');
        if (err) {
			console.log('err1', JSON.stringify(err));
           // return next(err);
        }
        if (!admin) {
            console.log(info.message);
        }
        req.logIn(admin, function (err) {
            if (err) {
				console.log('err2', JSON.stringify(err));
               // return next(err);
			}
			console.log('admin', JSON.stringify(admin));
            res.send(admin);

        });
    })(req, res);
}



// // Create a Login
// exports.login = (req, res) => {

//   // Create a Doctor
//   const loginVal = {
// 	email: encryption.encryptData(req.body.email),
// 	password: encryption.encryptData(req.body.password),
// 	//user_type: encryption.encryptData(req.body.role)
//   };

//   User.findAll({ where: loginVal })
//     .then(userData => {
// 	if(userData.length) {

// 	  var token = jwt.sign({}, dbConfig.SECRET);
// 	  var userTypeController = Doctor;
// 	  if(userData[0].user_type == 'patient') { userTypeController = Patient;  }
// 	  if(userData[0].user_type == 'responder') { userTypeController = Responder;  }

// 	  userTypeController.findAll({ where: {user_id: userData[0].id} })
// 		.then(doctorData => {
// 			console.log(doctorData);
// 			loginOutput = {
// 				"notification": {
// 					"message": "Success",
// 					"code": "200",
// 					"type": "Success",
// 					"is_auth": true,
// 					"hint": "Response Sent"
// 				},
// 				"data": {
// 					"first_name": doctorData[0].first_name,
// 					"last_name": doctorData[0].last_name,
// 					"mobile_no": userData[0].mobile_no,
// 					"email": userData[0].email,
// 					"userID": userData[0].id,
// 					"accessToken": token
// 				}
// 			};
// 		  res.send(loginOutput);
// 		})
// 		.catch(err => {
// 		  res.status(500).send({
// 			message:
// 			  err.message || "Some error occurred while retrieving doctor information."
// 		  });
// 		});
//     } else {
// 			loginOutput = {
// 				"notification": {
// 					"message": "Failure",
// 					"code": "404",
// 					"type": "Failure",
// 					"is_auth": false,
// 					"hint": "User record not found"
// 				},
// 				"data": {}
// 			};
// 		res.send(loginOutput);
// 	}})
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving user information."
//       });
//     });
// };
