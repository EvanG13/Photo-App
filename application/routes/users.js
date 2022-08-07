var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next)  {
  res.send('respond with a resource');
});

/* Post user registration */
router.post('/register', (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body;
  
  db.query('SELECT * FROM users where username=?', [username])
  .then(([results, fields]) => {
    if (results && results.length == 0) {
      return db.query('SELECT * FROM users where email=?', [email])
    }
    else {
      req.flash('error', 'Username already exists');
      req.session.save(function(err) {
        if (err) next(err);
        
        res.redirect('/register');
      })
    }
  })
  .then(([results, fields]) => {
    if (results && results.length == 0) {
      return bcypt.hash(password, 1);
    }
    else {
      req.flash('error', 'Email already exists');
      req.session.save(function(err) {
        if (err) next(err);
 
        res.redirect('/register');
      });
    }
  })
  .then((hashedPassword) => {
    return db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, hashedPassword]);
  })
  .then(([results, fields]) => {
    if (results && results.affectedRows) {

      return db.query('SELECT id, username, password FROM users WHERE username=?', [username])
    }
    else {
      req.flash('error', 'User could not be made');
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        
        res.redirect('/register');
      });
    }
  })
  .then(([results, fields]) => {
      req.session.username = results[0].username;
      req.session.userId = results[0].id;

      req.flash('success', 'User account created!');
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        res.redirect('/');
      });
  })
  .catch(err => next(err));
});

/* Post user login */
router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  let loggedUserId;
  let loggedUsername;

  db.query('SELECT id, username, password FROM users WHERE username=?', [username])
  .then(([results, fields]) => {
    if (results && results.length == 1) {
      let dbPassword = results[0].password;
      loggedUserId = results[0].id;
      loggedUsername = results[0].username;

      return bcypt.compare(password, dbPassword);
    }
    else {
      req.flash('error', 'Invalid username or password');
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        
        res.redirect('/login');
      });
    }
  })
  .then((passwordsMatch) => {
    if (passwordsMatch) {
      req.session.username = loggedUsername;
      req.session.userId = loggedUserId;

      req.flash('success', 'You are now logged in');
      req.session.save((err) => {
        if (err) {
          next(err);
        }

        res.redirect('/');
      });
    }
    else {
      req.flash('error', 'Invalid username or password');
      req.session.save((err) => {
        if (err) {
          next(err);
        }
        
        res.redirect('/login');
      });
    }
  })
  .catch((err) => next(err));
});

/* POST Log Out */
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    else {
      res.json({
        status: 'OK',
        code: 200,
        message: "Session was destroyed"
      });
    }
  });
});

module.exports = router;
