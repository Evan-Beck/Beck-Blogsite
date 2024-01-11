const User = require ('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User-Post associations. Each user can have multiple posts, belonging to that user due to the one-to-many relationship.
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
// Compliments the hasMany association above, establishing a many-to-one relationship with Post and User. 
Post.belongsTo(User, {
    foreignKey: 'userId',
});

// Post-Comment associations.
Post.hasMany(Comment, {
foreignKey: 'postId',
onDelete: 'CASCADE' // This is so that if a user is deleted, all associated posts and comments are deleted. The ladder goes for posts.
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = { User, Post, Comment };