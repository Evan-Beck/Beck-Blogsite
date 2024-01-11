const express = require('express');
const { Comment } = require('../models');
const router = express.Router();


// router.get('/:postId', async (req, res) => {
//     try {
//         const comments = await Comment.findAll({
//             where: { postId: req.params.postId }
//         });
//         res.status(200).json(comments);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        if (!req.session.userId) {
            res.redirect('/login');
            return;
        }
        await Comment.create({
            content: req.body.commentText,
            postId: req.params.postId,
            userId: req.session.userId  // Uses userId from session.
        });
        res.redirect('/posts/' + req.params.postId); // Redirects back to the post.
    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;