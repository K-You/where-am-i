/**
 * Firebase
 */

const admin = require("firebase-admin");
//Keystore
const serviceAccount = require("../../config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://where-am-i-9a782.firebaseio.com"
});

const database = admin.database();

/**
 * Return the location object stored in Firebase for the :session_id
 * @param Pathparam {Number} req.params.session_id  [The session_id]
 * @return {Object} record                          [location of the user]
 * @return {String} obj.color                       [color of the user]
 * @return {String} obj.lat                         [latitude of the user]
 * @return {String} obj.lng                         [longitude of the user]
 * @return {timestamp} obj.date                     [date of the record]
 */
exports.getLocation = function(req, res) {
  let session_id = req.params.session_id;
  let ref = database.ref("locations/" + session_id);
  ref.once("value", function(snapshot) {
    res.json(snapshot.val());
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}


/**
 * Add the location in Firebase for the :session_id
 * @param Pathparam {Number} req.params.session_id  [The session_id]
 * @param BodyParam {String} obj.color              [color of the user(Green/Blue/Red)]
 * @param BodyParam {Number} obj.lat                [latitude of the user]
 * @param BodyParam {Number} obj.lng                [longitude of the user]
 */
exports.addLocation = function(req, res) {
  // console.log(req.body);
  let lat, lng, color, session_id = undefined;
  let errorState = false;
  let errorMessage = "";
  //Checking the mandatory param longitude
  if (req.body.lat != undefined && !isNaN(req.body.lat)) {
    lat = req.body.lat;
  } else {
    errorState = true;
    errorMessage = errorMessage + "The 'lat' query param is mandatory and must be a valid latitude.\n";
  }
  //Checking the mandatory param longitude
  if (req.body.lng != undefined && !isNaN(req.body.lng)) {
    lng = req.body.lng;
  } else {
    errorState = true;
    errorMessage = errorMessage + "The 'lng' query param is mandatory and must be a valid longitude.\n";
  }
  //As the path is defined location/:session_id, it should exist.
  if (req.params.session_id != undefined) {
    session_id = req.params.session_id;
  } else {
    errorState = true;
    errorMessage = errorMessage + "You shouldn't be here without a session_id :o :o \n";
  }
  //If the color is not defined or other than blue/green/red, setting the default value red.
  if (req.body.color != "red" && req.body.color != "green" && req.body.color != "blue") {
    color = "red";
  } else {
    color = req.body.color;
  }


  if (errorState) {
    res.status(400).send(errorMessage);
  } else {
    try {
      database.ref('locations/' + session_id).set({
        lat: lat,
        lng: lng,
        color: color,
        date: Date.now()
      }, function(data) {
        // console.log(data);
        res.status(201).send();
      })
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal error occured.");
    }

  }
}
