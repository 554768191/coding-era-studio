var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('case/view/case');
});


router.get('/detail', function(req, res, next) {
    res.render('case/view/detail');
});

module.exports = router;