'use strict';

const http = require('http');
var haversine = require('haversine-distance')


exports.list_all_buses = function (req, res) {
  //	res.send("Requesting Buses");

  var data = '';
  http.get('http://localhost:8888/linhas', (resp) => {
  

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    let jsonResponse = JSON.parse(data);
    let busesData = jsonResponse.DATA;  
    let qtdOnibus = busesData.length;
    let responseArray = [];
    for (let i=0; i<qtdOnibus; i++){
      let busData = busesData[i];
      let busDataObject =  {
        'DataHora' : busesData[i][0],
        'Ordem' : busesData[i][1],
        'Linha' : busesData[i][2],
        'Latitude' : busesData[i][3],
        'Longitude' : busesData[i][4],
        'Velocidade' : busesData[i][5],
        'Direcao' : busesData[i][6]
      };
      responseArray.push(busDataObject);
    }    
    res.json(responseArray);
  });


});

};



exports.list_buses_by_distance = function (req, res) {
  //  res.send("Requesting Buses");

  var data = '';
  http.get('http://localhost:8888/linhas', (resp) => {
  

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    let jsonResponse = JSON.parse(data);
    let busesData = jsonResponse.DATA;  
    let qtdOnibus = busesData.length;
    let responseArray = [];
    let maxDistance = Number(req.params.maxDistance);
    console.log ("maxDistance: " + maxDistance);
    let myLat =  Number(req.params.myLat);
    console.log ("myLat: " + myLat);
    let myLong =	Number(req.params.myLong);
    console.log ("myLong: " + myLong);
    let myLatLng = { latitude: myLat, longitude: myLong};

    for (let i=0; i<qtdOnibus; i++){
      let busLat = Number(busesData[i][3]);
        //  console.log ("busLat: " + busLat);

      let busLong = Number(busesData[i][4]);
      //          console.log ("busLong: " + busLong);

      let busLatLng = { latitude: busLat, longitude: busLong};

      let distance = Number(haversine(myLatLng, busLatLng));
      //console.log("Distance : " + distance);

      let busDataObject =  {
        'DataHora' : busesData[i][0],
        'Ordem' : busesData[i][1],
        'Linha' : busesData[i][2],
        'Latitude' : busesData[i][3],
        'Longitude' : busesData[i][4],
        'Velocidade' : busesData[i][5],
        'Direcao' : busesData[i][6]
              };

      if (distance < maxDistance)
        responseArray.push(busDataObject);
    }    
    res.json(responseArray);
  });
});

};
