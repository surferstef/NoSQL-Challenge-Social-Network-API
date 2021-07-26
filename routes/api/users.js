const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
    // getAllThoughts,
    // getThoughtById,
    // createThought,
    // updateThought,
    // deleteThought,
    // createReaction,
    // deleteReaction
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
    .route('/:userIs/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;