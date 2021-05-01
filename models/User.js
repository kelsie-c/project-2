const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // login validation 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            // add address validation through the form? 3rd party library?
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
        //     validate: {
        //         isNumeric: true,
        //         len: [10],
        //     },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            // validate: {
            //     isEmail: true,
            // },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: [8],
            // },
        },
        groupId: {
            type: DataTypes.INTEGER,
            // DataTypes.ARRAY(DataTypes.INTEGER)
            // add functionality for deterniming groupID later
        }
    },
    {
        hooks: {
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;