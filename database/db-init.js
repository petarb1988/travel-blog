const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME_MAIN, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '/cloudsql/travel-blog-341317:europe-central2:travel-blog-mysql',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: "/cloudsql/travel-blog-341317:europe-central2:travel-blog-mysql"
    }
});

const sessionDbInit = new Sequelize(process.env.DB_NAME_SESSIONS, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '/cloudsql/travel-blog-341317:europe-central2:travel-blog-mysql',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: "/cloudsql/travel-blog-341317:europe-central2:travel-blog-mysql"
    }
});


module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.sessionDbInit = sessionDbInit;