const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing. 

// This checks for a password on login.
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password); // Compares provided password with hashed password in the DB.
    }
}
// Initializing User model's fields and rules. Specifies data types as integers, strings, no empty fields, 8 minimum characters for a password.
User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },

    },
    {
        hooks: {
            // Hashes the password before creating a new user. So before a user is created the password is hashed and before the user is updated the password is hashed. 
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false, // This tells sequelize to not automatically add timestamp fields for createdAt and updatedAt.
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);
module.exports = User;