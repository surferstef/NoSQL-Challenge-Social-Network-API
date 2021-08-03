const { Thought, User } = require('../models');


const thoughtController = {
    // , all users
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        // sort in DESC order by the _id value
        .sort({_id: -1 })
        .then(dbthoughtData => res.json(dbthoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'user',
            select: '-__v',
            
        })
        .select('-__v')
        .sort({_id: -1 })
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
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
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

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUpdatedThought => {
            //If no thought found, send 404 error
            if (!dbUpdatedThought) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbUpdatedThought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbDeletedThought => {
            //If no thought found, send 404 error
            if (!dbDeletedThought) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbDeletedThought);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )  
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



    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbthoughtData => {
            if (!dbthoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json({message: 'Successfully deleted the reaction'});
        })
        .catch(err => res.status(500).json(err));
    },


};

module.exports = thoughtController; 
