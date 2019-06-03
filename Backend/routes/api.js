var express = require('express');
var router = express.Router();
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asmsii:asmsii@cluster0-9q1xc.mongodb.net/test?retryWrites=true";
let nutrInfo = [];
var request = require('request');

const units = {
  /**
   * @param kj Kilojoule to convert in Kilocalorie
   */
  "kcal": function (kj) {
    return kj * 0.2390057;
  },
  /**
   * @param kcal Kilocalorie to convert in Kilojoule
   */
  "kj": function (kcal) {
    return kcal / 0.2390057
  }
}

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
          upc: body.product.id,
          img: body.product.image_front_url ? body.product.image_front_url : body.product.image_thumb_url,
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
                }
                res.send(body);
              });
            } else {
              res.send(body);
            }
            client.close();
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
      var list = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        ND: 0
      }
      v = v.map(e => {
        let grade = e.nutritionGrade ? e.nutritionGrade.toUpperCase() : "ND"
        list[grade] += 1;
        return {
          upc: e.upc,
          name: e.name,
          grade: grade
        }
      });
      res.render('food', {
        data: v,
        A: list["A"],
        B: list["B"],
        C: list["C"],
        D: list["D"],
        E: list["E"],
        ND: list["ND"]
      });
    })
  });
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
      collection.deleteOne({
        upc: upc
      }, (err, result) => {
        if (err) throw err;
        res.send(200);
      });
    });
  } else {
    res.send(400);
  }
});

router.get('/alternatives/:upc', (req, res, next) => {
  var upc = req.params['upc'];
  if (upc) {
    getRecommended(upc).then((result) => {
      res.send("" + result);
    }).catch((result) => {
      res.send(500);
    })
  } else {
    res.send(400);
  }
});

router.get('/categorize', (req, res, next) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    if (err) throw err;
    let collection = client.db("ProjetoAMSSII").collection("Products");

  });
});


router.get('/categorize/:upc', (req, res, next) => {
  var upc = req.params['upc'];
  if (upc) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    client.connect(err => {
      if (err) res.send(500);
      let categories = client.db("ProjetoAMSSII").collection("Categories");
      let products = client.db("ProjetoAMSSII").collection("Products");

      products.findOne({upc:upc}).then(result=>{
        res.render("./foodDetail.mustache",{product:result});
      }).catch(err => {
        res.send(500);
      })
    });

  } else {
    res.send(400);
  }
});


function getRecommended(upc) {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    client.connect(err => {
      if (err) throw err;
      const collection = client.db("ProjetoAMSSII").collection("Products");

      collection.findOne({
        upc: upc
      }, (err, result) => {
        if (err) reject(400);
        var energy = result.nutrients["energy_100g"];
        var energyUnit = result.nutrients["energy_unit"];
        if (energyUnit.toLowerCase() === "kcal") {
          energy = units.kj(energy);
        }

        resolve(energy);
      });
    });
  });
}



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
  //TODO: 
}

module.exports = router;