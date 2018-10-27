var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Miosense', reason: 'UTFSM'});
});

// About page route.
router.get('/about', function (req, res) {
  res.render('about', {title : 'Miosense'});
})

// About page route.
router.get('/graph', function (req, res) {
  var labels = [];
  var data = [];
  //var labels = ['Orange', 'Pear', 'Apple'];
  //var data = ['30', '12', '45'];
  res.render('graph', { title: 'Miosense', reason: 'UTFSM', labels: labels, data: data});
})
module.exports = router;
