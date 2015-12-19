var express = require('express');
var passport = require('passport');
var router = express.Router();

var Survey = require('../models/survey');
var Question = require('../models/question');
var Answer = require('../models/answer');

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
        expire: req.body.expireDate,
        userName : req.user ? req.user.display : ''
         
        
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
            Question.find(function (err, question) {
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
                question: question,
                displayName: req.user ? req.user.displayName : ''
            });
            }
            else 
            {
            res.render('surveys/tofedit', {
                title: 'Surveys',
                survey: survey,
                question: question,
                displayName: req.user ? req.user.displayName : ''
            });
            }
            
            

                
        }
    });
            
        }//end
    });
});

router.get('/responses/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    
    // use mongoose and our model to find the right user
    Question.findById(id, function (err, question) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            Answer.find(function (err, answer) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            
           
            res.render('surveys/response', {
                title: 'Surveys',
                answer: answer,
                question: question,
                displayName: req.user ? req.user.displayName : ''
            });

                
        }
    });
            
        }//end
    });
});


router.post('/:id', requireAuth, function (req, res, next) {
    Question.create({
        question: req.body.question,
        op1: req.body.option1,
        op2: req.body.option2,
        op3: req.body.option3,
        op4: req.body.option4,
        surveyId: req.body.surveyId
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/surveys');
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