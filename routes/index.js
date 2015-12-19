var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var Survey = require('../models/survey');
var Question = require('../models/question');
var Answer = require('../models/answer');
/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});


/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/surveys',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/surveys',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

/* Render Survey main page. */
router.get('/activesurveys', function (req, res, next) {
    Survey.find(function (err, surveys) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('activesurveylist', {
                title: 'Surveys',
                surveys: surveys,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

router.get('/activesurveys/:id', function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    
    // use mongoose and our model to find the right user
    Survey.findById(id, function (err, survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            Question.find(function (err, question) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            if(survey.template == "CheckBox")
            {
            res.render('ckbanswer', {
                title: 'Surveys',
                survey: survey,
                question: question,
                k: 0,
                displayName: req.user ? req.user.displayName : ''
            });
            }
            else 
            {
            res.render('tofanswer', {
                title: 'Surveys',
                survey: survey,
                question: question,
                k:0,
                displayName: req.user ? req.user.displayName : ''
            });
            }
            
            

                
        }
    });
            
        }//end
    });
});

/* process the edit form submission */
router.post('/activesurveys/:id', function (req, res, next) {
       Answer.create({
        response: req.body.option,
        questionId: req.body.questionId        
        
    }, function (err, Survey) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            
            res.redirect('/activesurveys');
            
        }
    });
});

module.exports = router;
