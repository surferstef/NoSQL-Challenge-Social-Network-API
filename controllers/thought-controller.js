const { Thought } = require('../models');

const thoughtController = {
    // get all users
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbthoughtData => {
            //If no thought found, send 404 error
            if (!dbthoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbthoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbthoughtData => res.json(dbthoughtData))
        .catch(err => res.status(400).json(err));
    },

    

};

module.exports = thoughtController; 
