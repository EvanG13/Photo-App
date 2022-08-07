var express = require('express');
var router = express.Router();
const { getRecentPosts } = require('../middleware/postmiddleware');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { 
    title: 'CSC 317 App', 
  });
});

/* GET Login Page */
router.get('/login', function(req, res, next) {
  res.render('login', {
    title: "CSC 317 App",
  });
});

/* GET Register Page */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: "CSC 317 App",
    js: ['validation.js'],
  });
});

/* GET Post Image Page */
router.use('/post', function(req, res, next) {
  if (req.session.username) {
    next();
  }
  else {
    req.flash('error', 'Only logged in users can make posts');
    req.session.save((err) => {
      if (err) {
        next(err);
      }

      res.redirect('/');
    })
  }
});
router.get('/post', function(req, res, next) {
  res.render('postimage', {
    title: "CSC 317 App",
  });
});

/* GET View Image Page */
router.get('/view', function(req, res, next) {
  res.render('viewpost', {
    title: "CSC 317 App",
  });
});

/* POST Logout */
router.post('/logout', function(req, res, next) {
  req.session.destroy(err);
  if (err) {
    next(err);
  }
  else {
    res.json({
      static: 'ok',
      code: '200', 
      message: 'session was destroyed'
    });
  }
});

module.exports = router;
