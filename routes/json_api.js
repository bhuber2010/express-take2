
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var resorts = require('../resort_list');


router.get('/list', function(req, res) {
  res.json(resorts);
});

router.get('/list/:id', function(req, res) {
  var resortList = getResort(resorts, req.params.id);
  res.json(resortList.resortObj);
});

router.post('/add', function(req, res) {
  var newResort = {
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating
  };
  resorts.push(newResort);
  res.send("Resort added");
});

router.put('/:id', function(req, res) {
  var resort = getResort(resorts, req.params.id).resortObj;
  var resortIndex = getResort(resorts, req.params.id).index;
  resort.id = req.body.id || resort.id;
  resort.name = req.body.name || resort.name;
  resort.location = req.body.location || resort.location;
  resort.rating = req.body.rating || resort.rating;
  resorts[resortIndex] = resort;
  res.send("Resort ID# " + resortIndex + " updated");
})

router.delete('/delete', function(req, res) {
  var resort = getResort(resorts, req.body.id);
  resorts.splice(resort.index,1);
  res.send("Resort ID# " + resort.resortObj.id + " removed");
})


function getResort(list, searchID) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === searchID) {
      return {resortObj: list[i], index: i};
    }
  }
  return "Resort not found"
}


module.exports = router;
