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


//i.e. http://localhost:3000/api/food/737628064502
router.get('/food/:upc', (req, res, next) => {
  var upc = req.params['upc'];
  if (upc) {

    request.get(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`,(err,response,body)=>{
    if(!err & response.statusCode === 200){
      body = JSON.parse(body);
      body =  {
          status : body["status_verbose"],
          sources : body.product.sources,
          ingredients: body.product.ingredients,
          nutrients_grade: body.product.nutrition_grades,
          img: body.product.image_thumb_url,
          id: body.product.id,
          brands: body.product.brands,
          nutrients: body.product.nutriments
        };
      res.send(body);
    }
    });
  } else {
    res.statusCode(400).send("No UPC Provided");
  }
});
router.get('/food', (req, res, next) => {
  res.send("Food endpoint");
});


module.exports = router;

// router.get('/getFoodUPC', (req, res, next) => {
//   if (req.query.upc) {
//     const upc = req.query.upc;
//     const client = new MongoClient(uri, {
//       useNewUrlParser: true
//     });
//     client.connect(err => {
//       if (err) throw err;
//       const collectionApis = client.db("ProjetoAMSSII").collection("Apis");
//       collectionApis.find({
//         type: "UPCSearch"
//       }).toArray((err, result) => {
//         if (err) {
//           throw err;
//         } else {
//           let urls = [];
//           var promises = [];
//           result.forEach(e => {
//             e.url = e.url.replace("${query}", upc);
//             console.log("request: " + e.url);
//             if (e.auth !== "none") {
//               promises.push(new Promise((resolve, reject) => {
//                 var options = {
//                   method: "GET",
//                   url: e.url,
//                   headers: {
//                     'X-RapidAPI-Key': e.apikey
//                   }
//                 };
//                 request(options, function (error, response, body) {
//                   if (error) {
//                     reject(error);
//                   }
//                   if (!error && response.statusCode == 200) {
//                     resolve(body);
//                   } else if (response.statusCode == 404) {
//                     resolve(null);
//                   }
//                 });
//               }));

//             } else {
//               promises.push(new Promise((resolve, reject) => {
//                 request(e.url, function (error, response, body) {
//                   if (error) {
//                     reject(error);
//                   }
//                   if (!error && response.statusCode == 200) {
//                     resolve(JSON.parse(body));
//                   }
//                 });
//               }));
//             }
//           });

//           Promise.all(promises).then(result => {
//             res.send(result);
//           }).catch(err => {
//             console.log(err);
//           });
//         };
//       });
//     })
//   } else {
//     res.status(400).send("No UPC provided");
//   }
// });