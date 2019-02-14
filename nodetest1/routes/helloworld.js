const express = require('express');
const router = express.Router();

router.get('/', function (req, resp, next) {
    resp.render('helloworld', { title: 'Hello World '});
})

module.exports = router