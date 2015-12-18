var express = require('express');
var passport = require('passport');
var router = express.Router();

var Survey = require('../models/survey');
var Question = require('../models/question');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

/* Render Survey main page. */
router.get('/', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/surveylist', {
                title: 'Surveys',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

router.get('/createsurvey', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('surveys/index', {
                title: 'Surveys',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

router.post('/createsurvey', requireAuth, function (req, res, next) {
       Survey.create({
        name: req.body.name,
        template: req.body.template,
        active: req.body.activeDate,
        expire: req.body.expireDate
        
                
        
    }, function (err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            
            res.redirect('/surveys');
            
        }
    });
});

router.get('/surveyList', requireAuth, function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            
            res.render('surveys/surveylist', {
                title: 'Edit Survey',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });

                
        }
    });
});

router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    
    // use mongoose and our model to find the right user
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            if(survey.template == "CheckBox")
            {
            res.render('surveys/ckbedit', {
                title: 'Surveys',
                survey: survey,
                displayName: req.user ? req.user.displayName : ''
            });
            }
            else 
            {
            res.render('surveys/tofedit', {
                title: 'Surveys',
                survey: survey,
                displayName: req.user ? req.user.displayName : ''
            });
            }
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var user = new User(req.body);
    user.password = user.generateHash(user.password);
    user._id = id;
    user.updated = Date.now();
    
    // use mongoose to do the update
    User.update({ _id: id }, user, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/users');
        }
    });
});

router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Survey.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/surveys');
        }
    });
});


module.exports = router;