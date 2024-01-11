const express = require ('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.render('posts', { posts }); 
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId  // Assuming userID is passed in request
        });
        res.redirect('/posts');
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to update an existing post.
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: { id: req.params.id }
            }
        );
        if (updatedPost[0] > 0) {
            res.redirect('/posts/' + req.params.id);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a post. 
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });

        if (deletedPost) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;