var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongoapp:mongoapp@cluster0-9q1xc.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

/* GET root api */
router.get('/', function (req, res, next) {
  const collection = client.db("ProjetoAMSSII").collection("Settings");
  client.connect(err => {
    if (err){
      res.status(500).send('[API ERROR] Problem connecting to the database')
      throw err;
    }

    res.render('index', {
      title: 'Express'
    });
    client.close();
  });
});

module.exports = router;