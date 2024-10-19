const { Sequelize, Op } = require('sequelize');

// Initialize Sequelize for SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/algred.db' // Path to SQLite database
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error connecting to database:', err));

module.exports = sequelize;