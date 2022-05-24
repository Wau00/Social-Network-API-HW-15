const router = require('express').Router();

const { get } = require('express/lib/response');
const {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userControllers')


router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendId').post(createFriend).delete(deleteFriend)


module.exports = router;