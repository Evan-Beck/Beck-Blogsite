const { Model, DataTypes } = require('seqeulize'); // Importing Model class and DataTypes from Sequelize.
const seqeuelize = require ('../config/connection'); // Importing the sequelize connection from connection.js.

class Comment extends Model {} // Comment class that extends Sequelize's Model class.

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER, // Specifies the data type as an integer, can't be empty, primaryKey field, and Auto-increments the value for every new entry.
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        commentText: {
            type: DataTypes.STRING, // Specifies data type as a string, can't be empty, and len makes sure the comment can't be empty. 
            allowNull: false,
            validate: {
                len: [1], 
            },
            userId: {
                type: DataTypes.INTEGER, // Data type is an integer, model references the user model, the ID in user model specifically.
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            postId: {
                type: DataTypes.INTEGER, // References the ID in the post model. 
                references: {
                    model: 'post',
                    key: 'id',
                },
            },
        },
    },
   {
    sequelize, // Passes Sequelize to enable the model to interact with our database.
    freezeTableName: true, // Prevents Sequelize from renaming the table. 
    underscored: true, 
    modelName: 'comment',
   } 
);
module.exports = Comment; // Exports comment model for use in other parts of the application.