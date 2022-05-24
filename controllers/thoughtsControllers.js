const { Thoughts, Users } = require('../models');


module.exports = {

    
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
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
        Thoughts.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thoughts => res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    
    getSingleThoughts(req, res) {
        Thoughts.findOne({ _id: req.params.id })
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
        Thoughts.findOneAndUpdate(
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
        Thoughts.findOneAndDelete({ _id: req.params.id })
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
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $push: { reactions: body } }, 
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
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $pull: { reactions: { reactionId: params.reactionId } } }, 
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
