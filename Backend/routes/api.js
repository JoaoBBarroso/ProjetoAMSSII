var express = require('express');
var router = express.Router();
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asmsii:asmsii@cluster0-9q1xc.mongodb.net/test?retryWrites=true";
let nutrInfo = [];
var request = require('request');
var nutritionGrades = ["A", "B", "C", "D", "E"];
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
      if(err){
        res.send(500);
        return;
      }
      if (!err & response.statusCode === 200) {
        const client = new MongoClient(uri, {
          useNewUrlParser: true
        });
        body = JSON.parse(body);
        if (!body.product) {
          res.send(500);
          client.close();
          return;
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
          categories: ETLCategories(body.product["categories_tags"])
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
    collection.find({}).sort({
      'upc': 1
    }).toArray().then(v => {
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
    collection.find({}).toArray().then(async result => {
      console.log(`Fetched ${result.length} results`);
      for (let i = 0; i < result.length; i++) {
        await new Promise((resolve, reject) => {
          setTimeout(async () => {
            try {
              let pd = await new Promise((resolve, reject) => {
                request.get(`https://world.openfoodfacts.org/api/v0/product/${result[i].upc}.json`, (err, response, body) => {
                  if (err) {
                    reject(err)
                  } else {
                    body = JSON.parse(body);
                    if (!body.product) {
                      reject("No Product");
                    } else {
                      body = {
                        status: body["status_verbose"],
                        sources: body.product.sources ? "" : body.product.sources,
                        ingredients: body.product.ingredients,
                        nutritionGrade: body.product.nutrition_grades,
                        nutrients: body.product.nutriments,
                        brand: body.product.brands,
                        name: body.product["product_name"] !== "" ? body.product["product_name"] : body.product.generic_name,
                        upc: body.product.id,
                        img: body.product.image_front_url ? body.product.image_front_url : body.product.image_thumb_url,
                        categories: ETLCategories(body.product["categories_tags"])
                      };
                      resolve(body);
                    }
                  }
                });
              });
              console.log(`[${i+1}/${result.length}][${pd.upc}] Product Fetched`);
              console.log(`[${i+1}/${result.length}][${pd.upc}] Found ${pd.categories.length} Categories`);
              if (pd.categories.length>0) {
                collection.updateOne({
                  upc: pd.upc
                }, {
                  $push: {
                    categories: {
                      "$each": pd.categories
                    }
                  }
                }, (result) => {
                  console.log(`[${pd.upc}] Updated Product`);
                });
              }

            } catch (error) {
              console.log(`We found an error (${error}) with this product ${result[i].upc}, but let's continue...`);
            }
            resolve("");
          }, 2000);
        });

      }
      res.send(200)
    });
  });
});

router.get('/categorize/:upc', (req, res, next) => {
  var upc = req.params['upc'];
  var next = req.query.next;
  if (upc) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true
    });
    client.connect(err => {
      if (err) res.send(500);
      let categories = client.db("ProjetoAMSSII").collection("Categories");
      let products = client.db("ProjetoAMSSII").collection("Products");
      if (next) {
        var p = products.find({
          'upc': {
            '$gt': upc
          }
        }).sort({
          'upc': 1
        }).limit(1).toArray().then(result => {
          res.redirect("/api/categorize/" + result[0].upc)
        })
      } else {
        products.findOne({
          upc: upc
        }).then(result => {
          request.get(`https://world.openfoodfacts.org/api/v0/product/${result.upc}.json`, (err, response, body) => {
            body = JSON.parse(body);
            res.render("./foodCategorizer.mustache", {
              product: result,
              categories: body.product.categories_tags
            });
            client.close();
          });
        }).catch(err => {
          res.send(500);
        });
      }

    });

  } else {
    res.send(400);
  }
});

router.post("/categorize", (req, res, next) => {
  var upc = req.body["upc"];
  var category = req.body["category"];
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    if (err) res.send(500);
    let products = client.db("ProjetoAMSSII").collection("Products");
    products.updateOne({
      upc: upc
    }, {
      $push: {
        categories: category
      }
    }, (err, result) => {
      console.log("Added Category");
      if (err) res.send(500);
      else {
        res.send(200)
      }
    });
  });
});

router.get("/recommend/:upc", (req, res, next) => {
  var upc = req.params['upc'];
  const client = new MongoClient(uri, {
    useNewUrlParser: true
  });
  client.connect(err => {
    if (err) res.send(500);
    let products = client.db("ProjetoAMSSII").collection("Products");
    products.findOne({
      upc: upc
    }, (err, product) => {
      if (product.nutritionGrade === "ND") {
        res.sendStatus(500).send("We don't have a NutriScore for this yet")
        return;
      }
      let ltGrades = nutritionGrades.slice(0, nutritionGrades.indexOf(product.nutritionGrade));
      ltGrades.forEach(e => {
        ltGrades.push(e.toLowerCase());
      });
      products.find({
        $and: [{
          categories: {
            $in: product.categories
          }
        }, {
          nutritionGrade: {
            $in: ltGrades
          }
        }]
      }).sort({
        nutritionGrade: 1
      }).toArray().then((results) => {
        res.send(results.slice(0, 10));
      });

    });
  });
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

function ETLCategories(categories) {
  if(!categories) return [];
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  categories = categories.filter(element => {
    return element.startsWith("en")
  });

  categories = categories.map(element => {
    element = element.replace("en:", "");
    element = element.replace(/-/g, " ");
    element = element.split(" ");
    for (let i = 0; i < element.length; i++) {
      element[i] = capitalize(element[i]);
    }
    return element.join(" ");

  });

  return categories
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