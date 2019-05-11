var express = require('express');
var router = express.Router();
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asmsii:asmsii@cluster0-9q1xc.mongodb.net/test?retryWrites=true";
let nutrInfo = [];
var request = require('request');

router.get('/listapis', function (req, res, next) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    if (err) throw err;
    const collectionApis = client.db("ProjetoAMSSII").collection("Apis");
    // perform actions on the collection object

    collectionApis.find({}).toArray((err, result) => {
      res.send(result);
      client.close();
    });
  });
});

router.get('/getFoodUPC', (req, res, next) => {
  if (req.query.upc) {
    const upc = req.query.upc;
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    client.connect(err => {
      if (err) throw err;
      const collectionApis = client.db("ProjetoAMSSII").collection("Apis");
      collectionApis.find({
        type: "UPCSearch"
      }).toArray((err, result) => {
        if (err) {
          throw err;
        } else {
          let urls = [];
          var promises = [];
          result.forEach(e => {
            e.url = e.url.replace("${query}", upc);
            console.log("request: " + e.url);
            if (e.auth !== "none") {
              promises.push(new Promise((resolve, reject) => {
                var options = {
                  method: "GET",
                  url: e.url,
                  headers: {
                    'X-RapidAPI-Key': e.apikey
                  }
                };
                request(options, function (error, response, body) {
                  if (error) {
                    reject(error);
                  }
                  if (!error && response.statusCode == 200) {
                    resolve(body);
                  } else if (response.statusCode == 404) {
                    resolve(null);
                  }
                });
              }));

            } else {
              promises.push(new Promise((resolve, reject) => {
                request(e.url, function (error, response, body) {
                  if (error) {
                    reject(error);
                  }
                  if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                  }
                });
              }));
            }
          });

          Promise.all(promises).then(result => {
            res.send(result);
          }).catch(err => {
            console.log(err);
          });
        };
      });
    })
  } else {
    res.status(400).send("No UPC provided");
  }
});



module.exports = router;