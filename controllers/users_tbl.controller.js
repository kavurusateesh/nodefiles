var jwt = require("jsonwebtoken");
var encryption = require('../helpers/Encryption');
const dbConfig = require("../config/db.config.js");
const passport = require('passport');

require('../config/passport')(passport);

exports.login = function (req, res) {
	
    passport.authenticate('local', function (err, user, info) {
		
        if (err) {
			console.log('err1', JSON.stringify(err));
           // return next(err);
        }
        if (!user) {
            console.log("addmin details is empty..");
        }
       
        req.logIn(user, function (err) {
            if (err) {
				console.log('err2', JSON.stringify(err));
               // return next(err);
            }
            console.log("final data--------", user);
          	loginOutput = {
				"notification": {
					"message": "Success",
					"code": "200",
					"type": "Success",
					"is_auth": true,
					"hint": "Response Sent"
				},
				"data": {
					
					"email": user.email,
					"userID": user.id,
					"accessToken": "djkfadhfjajfjajdfhahfhhfhdhadhh---"
				}
			};
			res.send(loginOutput);

        });
    })(req, res);
}

exports.sessionDetails = (req, res) => {
   
    console.log("use details -----------", req.user);
	// if(session.user) {
	// 	req.header("Authorization", session.user.token);
	// 	var sessionData = {			
	// 		"status" : "success", 
	// 		"data" : {
	// 			"user_id": session.user.user_id,  
	// 			"email" : session.user.user_email,
	// 			"token" : session.user.token
	// 		},
	// 		"dataHeader": { "headers": { "Authorization": session.user.token } }
	// 	};
	// 	res.json(sessionData);
	// } else {
	// 	var result = {"status" : "failure", "data" : {"message" : "Login Failure !!"}};
	// 	res.json(result);
	// }
};    

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
