var express = require('express');
app = express();
port = process.env.PORT || 3000;

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/busbasixRoutes'); //importing route
routes(app); //register the route


app.listen(port);
console.log('RESTful API BUSBASIX server started on: ' + port);