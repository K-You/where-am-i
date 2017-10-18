module.exports = function(app) {
  const controller = require('../controllers/locationController');

  app.route('/locations/:session_id')
    .get(controller.getLocation)
    .post(controller.addLocation);
};
