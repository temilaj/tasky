var express = require('express');
var router = express.Router();

router.get('/', function(req, res, send) {
    // res.render('index');
    res.render('index.html');
});

module.exports = router;