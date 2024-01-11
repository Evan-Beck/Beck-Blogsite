const express = require('express');
const router = express.Router();
const { Comment } = require('/..models');

router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId }
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            userId: req.body.userId,  
            postId: req.body.postId   
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;