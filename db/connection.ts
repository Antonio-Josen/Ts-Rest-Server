

import {Sequelize} from 'sequelize'

const db = new Sequelize('Node','root','node',{
    host:'localhost',
    dialect:'mysql'
});

export default db;