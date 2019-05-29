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
    request.get(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`, (err, response, body) => {
      if (!err & response.statusCode === 200) {
        const client = new MongoClient(uri, {
          useNewUrlParser: true
        });
        body = JSON.parse(body);
        if (!body.product) {
          res.send(500);
          client.close();
        }
        body = {
          status: body["status_verbose"],
          sources: body.product.sources,
          ingredients: body.product.ingredients,
          nutritionGrade: body.product.nutrition_grades,
          nutrients: body.product.nutriments,
          brand: body.product.brands,
          name: body.product["product_name"] !== "" ? body.product["product_name"] : body.product.generic_name,
          upc: body.product.id
          img: body.product.image_thumb_url,
        };

        client.connect(err => {
          if (err) throw err;
          let collection = client.db("ProjetoAMSSII").collection("Products");
          collection.findOne({
            upc: body.upc
          }, (err, result) => {
            if (err) {
              res.sendStatus(500).send("Damn, we found an error search for this product in our database");
              client.close();
            }
            if (!result) {
              collection.insertOne(body, (err, resp) => {
                if (err) {
                  res.sendStatus(500);
                  client.close();
                }
                res.send(body);
                client.close();
              });
            } else {
              res.send(body);
              client.close();
            }
          });
        });

      }
    });
  } else {
    res.statusCode(400).send("No UPC Provided");
    client.close();
  }
});

router.get('/food', (req, res, next) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    if (err) throw err;
    let collection = client.db("ProjetoAMSSII").collection("Products");
    collection.find({}).toArray().then(v => {
      v = v.map(e => {
        return {
          upc: e.upc,
          name: e.name,
          grade: e.nutritionGrade ? e.nutritionGrade.toUpperCase() : "ND"
        }
      })
      res.render('food', {
        data: v
      });
    })
  });
});

router.get("/populate", (req, res, next) => {

  const clientRemote = new MongoClient(uri, {
    useNewUrlParser: true
  });
  clientRemote.connect(err => {
    if (err) throw err;
    let collection = clientRemote.db("ProjetoAMSSII").collection("Products");

    collection.remove({
      name: null
    }, result => {
      res.send(result);
    });

  });
})

router.post("/foods", (req, res, next) => {
  var upcs = req.body['upcs'];
  if (upcs) {
    upcs.forEach((element, i) => {
      setTimeout(() => {
        request.get(`http://localhost:3000/api/food/${element}`, (err, res, body) => {
          if (err) {
            console.log("Error");
            return;
          };
          console.log(`[ADDED ${i}] ${res.statusCode}`);
          return;
        })
      }, 500);
    });
    res.send(`Adding ${upcs.length} products`);
  }
});

router.delete('/food/:upc', (req, res, next) => {
  var upc = req.params['upc'];
  if (upc) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    client.connect(err => {
      if (err) throw err;
      let collection = client.db("ProjetoAMSSII").collection("Products");
      collection.remove({upc:upc},(err,result)=>{
        if(err) throw err;
        res.redirect('/food');
      });
    });
  }else{
    res.send(400);
  }

});

/**
 * Método que calcula o indice saudável de um elemento, baseado nos seus dados nutricionais
 * @param propotion Valor que indica o valor de referência do produto
 * @param gorduraTotal  Valor total da gordura presente no alimento
 * @param gorduraSat  Valor de gordura saturada do alimento
 * @param gorduraTrans  Valor de gordura trans do alimento
 * @param sodio Valor de sodio no alimento
 * @param potassio Valor de potassio no alimento
 * @param ferro Valor de ferro no alimento
 * @param vitaminas Conjunto de vitaminas no alimento
 * @param acuca Valor de acuçar presente no alimento
 */
function healthyRating(p, gorduraTotal, gorduraSat, gorduraTrans, sodio, potassio, acucar, acucarSat, ferro, vitaminas) {

  var g = (((gorduraSat + gorduraTrans) / gorduraTotal) * gorduraTotal) / p; // Percentagem de gordura "má".
  var s = sodio / p; // Percentagem de sódio -
  var pt = potassio / p; // Percentagem de potassio +
  var a = acucarSat / acucar //  Percentagem de açucar
  var f = ferro / p; // Percentagem de ferro

  if (gorduraTotal - (gorduraSat + gorduraTrans) < (gorduraSat + gorduraTrans)) {
    return -1
  }
}

module.exports = router;