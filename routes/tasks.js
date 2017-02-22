var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('CONNECTIONSTRING HERE', ['tasks'])

//GET Task
router.get('/task/:id', function(req, res, next) {
    // res.send('TASKY API');
    db.tasks.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, task) {
        if (err) {
            res.send(err);
        } else {
            res.json(task);
        }
    });
});


// router.get('/tasks', function(req, res, send) {
//     res.send('TASKY');
// });

//GET Tasks
router.get('/tasks', function(req, res, next) {
    // res.send('TASKY API');
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        } else {
            res.json(tasks);
        }
    });
});


//Save Tasks
router.post('/task', function(req, res, next) {
    var task = req.body;
    if (!task.text || !(task.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.tasks.save(task, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Update Tasks
router.put('/task/:id', function(req, res, next) {
    var task = req.body;
    var updatedObj = {};

    if (task.isCompleted) {
        updatedObj.isCompleted = task.isCompleted;
    }

    if (task.text) {
        updatedObj.text = task.text;
    }

    if (!updatedObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.tasks.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updatedObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

//Delete Task
router.delete('/task/:id', function(req, res, next) {
    db.tasks.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;