const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

//add prefix of '/users' to routes created in 'users.js'
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;