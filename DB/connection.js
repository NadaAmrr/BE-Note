import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize("asgmt5sequelize", 'root','', {
    host: 'localhost',
    dialect: 'mysql'
})

export const connectDB = async () =>{
    return await sequelize.sync({alter:false}).then(Result =>{
        console.log(`DB connected`);
        // console.log(Result);
    }).catch(err =>{
        console.log(`fail to connect DB..........${err}`)
    })
}