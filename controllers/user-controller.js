const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        // sort in DESC order by the _id value
        .sort({_id: -1 })
        .then(dbuserData => res.json(dbuserData))
        .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbuserData => {
            //If no user found, send 404 error
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbuserData => res.json(dbuserData))
        .catch(err => res.status(400).json(err));
    },

    // update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            body,
            { new: true, runValidators: true }
        )
        .then(dbuserData => {
            //If no thought found, send 404 error
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    deleteUser({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId }
        )
        .then(dbuserData => {
            //If no thought found, send 404 error
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create friend
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbuserData => {
            //If no thought found, send 404 error
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbuserData => {
            //If no thought found, send 404 error
            if (!dbuserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbuserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    

};

module.exports = userController; 
