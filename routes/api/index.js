const router = require('express').Router();
const userRoutes = require('./users');

//add prefix of '/users' to routes created in 'users.js'
router.use('/users', userRoutes);

module.exports = router;