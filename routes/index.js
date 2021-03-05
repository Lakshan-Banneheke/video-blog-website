const express = require('express');
const router = express.Router();
const setHeader = require('../middleware/setHeader');

router.use('/', setHeader, require('./root'));
router.use('/users', setHeader, require('./users'));


router.use((req, res) => res.status(404).render('404'));

module.exports = router;
