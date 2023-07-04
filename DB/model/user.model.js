import { sequelize } from '../connection.js';
import { DataTypes } from 'sequelize';
import noteModel from './note.model.js';

const userModel = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: true
}
)
userModel.hasMany(noteModel,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

noteModel.belongsTo(userModel)

export default userModel

