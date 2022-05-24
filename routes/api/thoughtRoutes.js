const router = require('express').Router();


const {
    getThoughts,
    createReaction,
    getSingleThoughts,
    createThoughts,
    deleteReaction,
    updateThoughts,
    deleteThoughts,
} = require('../../controllers/thoughtsControllers');

router.route('/').get(getThoughts).post(createThoughts);
router.route('/:id').get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;