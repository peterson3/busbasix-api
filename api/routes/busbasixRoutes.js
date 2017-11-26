'use strict';

module.exports = function(app) {
  var busController = require('../controllers/busController');

  app.route("/")
    .get(function (req, res){
  	res.send("Welcome to BUSBASIX API");
  });
  

  app.route("/buses")
    .get(busController.list_all_buses);


app.route("/buses/myLat=:myLat&myLong=:myLong&maxDistance=:maxDistance")
  .get(busController.list_buses_by_distance)


};