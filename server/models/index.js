const { Sequelize } = require('sequelize')
const userModel = require('./User')
const holdingsModel = require('./Holdings')

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
    })
    : new Sequelize({ 
    dialect: 'sqlite',
    storage: './database.sqlite'
    });

const User = userModel(sequelize);
const Holdings = holdingsModel(sequelize);

User.hasMany(Holdings)
Holdings.belongsTo(User);

module.exports = {User, Holdings, sequelize};