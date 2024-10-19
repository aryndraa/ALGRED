const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();  
const harvestRoutes = require('./routes/harvestRoutes');
const sequelize = require('./server/db'); // Import Sequelize instance

const app  = express();
const port = 5000

// Sync the database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Failed to sync database:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/harvest', harvestRoutes());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});