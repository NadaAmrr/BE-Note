import { sequelize } from '../connection.js';
import { DataTypes } from 'sequelize';

const noteModel = sequelize.define('Note',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
}
)

export default noteModel