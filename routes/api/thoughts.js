const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  router
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
  .route('/:thoughtId/:reactionId')
  .delete(deleteReaction);

module.exports = router;