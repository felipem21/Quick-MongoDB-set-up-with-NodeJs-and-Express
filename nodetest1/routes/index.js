var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function (req, res, next) {

  // Extract the db object we passed to our http quest
  var db = req.db;

  // get the table
  var collection = db.get('usercollection');

  // fill the docs variable with the database information
  collection.find({},{}, function (e, docs) {
    res.render('userlist', {
      'userlist' : docs,
      userTitle: 'User List'
    })
  });
});

// Add new user
router.get('/newuser', function (req, resp) {
  resp.render('newuser', { title: 'Add New User' });
});

router.post('/adduser', function (req, res) {

  //set internal db variable
  var db = req.db;

  //GET FORM values
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //set our collections
  var collection = db.get('usercollection');

  //Submit input content to the database
  collection.insert({
      'username': userName,
      'email': userEmail
  }, function (err, doc) {
      if (err) {
          // if it fails return the error
          res.send('There was a problem adding info to the db');
      } else {
          // and forward to the succes page
          res.redirect('userlist');
      }

      // in real world situations, I would check validation of email,
      // duplicate username and emaila

  })
})

module.exports = router;
