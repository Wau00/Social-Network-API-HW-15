const { Thought, User } = require('../models');


module.exports = {

    createThoughts(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true });
            })
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts)
            })
            .catch(err => res.json(err));
    },


    getThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    getSingleThoughts(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateThoughts(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-___v')
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.json(err));
    },

    deleteThoughts(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(400).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(400).json(err))

    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true })
            .then(thoughts => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts with this ID' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(400).json(err));
    }

};
