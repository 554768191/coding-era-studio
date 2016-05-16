'use strict';

module.exports = function(app) {

    var caseController = require('../../controllers/case/case.server.controller');
    app.route('/case').get(caseController.getCases);
    app.route('/detail').get(function(res,req,next){
        res.render('case/view/detail');
    });
};

/* GET home page.
router.get('/', function(req, res, next) {
    var options = {
        url: 'http://localhost:8080/api/open/case/list'
    };

   // app.engine('.view.html', consolidate['swig']);
    //app.set('view engine', '.view.html');

    function callback(error, response, body) {
        console.log(JSON.parse(body));
        //app.locals.datas = body;
        res.render('case/view/case',JSON.parse(body));
        //if (!error && response.statusCode == 200) {
        //    done(null, JSON.parse(body));
        //} else {
        //    done(JSON.parse(body));
        //}
    }

    request(options, callback);



});


router.get('/detail', function(req, res, next) {
    res.render('case/view/detail');
});


router.get('/cases', function (req, res) {
    express.get('http://localhost:8080/api/open/case/list', function (req, res, next) {
        console.log(res);
        next();
    }, function (req, res) {
        res.send('Hello from B!');
    });
});

module.exports = router;

 */