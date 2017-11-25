'use strict';

module.exports = function(app) {
  //var todoList = require('../controllers/todoListController');

const http = require('http');




  app.route("/")
    .get(function (req, res){
  	res.send("Welcome to BUSBASIX API");
  });
  


  app.route("/buses")
    .get(function (req, res){
  //	res.send("Requesting Buses");

  var data = '';
  http.get('http://localhost:8888/linhas', (resp) => {
  

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {	
    res.json(JSON.parse(data));
  });


});

  });

  // todoList Routes
  //app.route('/tasks')
  //  .get(todoList.list_all_tasks)
  //  .post(todoList.create_a_task);


  //app.route('/tasks/:taskId')
  //  .get(todoList.read_a_task)
  //  .put(todoList.update_a_task)
  //  .delete(todoList.delete_a_task);
};
