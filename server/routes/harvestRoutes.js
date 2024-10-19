const express = require('express');
const Harvest = require('../models/Harvest');
const sequelize = require('../server/db');
const { Op } = require('sequelize');

module.exports = () => {
    const router = express.Router();

    router.post('/add-harvest', async (req, res) => {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        try {
            const harvest = await Harvest.create({ amount });
            res.json({ 
                message: 'Harvest result added successfully', 
                harvest 
            });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({
                 error: 'Failed to add harvest result' 
            });
        }
    });

    router.get('/weekly-harvest', async (req, res) => {
        try {
            const currentMonth = new Date().getMonth() + 1; 
            const currentYear = new Date().getFullYear(); 

            const monthlyData = await Harvest.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('strftime', '%m', sequelize.col('created_at')), currentMonth.toString().padStart(2, '0')), // Current month (formatted as 2 digits)
                        sequelize.where(sequelize.fn('strftime', '%Y', sequelize.col('created_at')), currentYear.toString()) // Current year
                    ]
                },
                limit: 4
            });

            res.json({
                 message: 'Monthly harvest data', 
                 data: monthlyData
            });

        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: err.message });
        }
    });
    
    router.get('/year-harvest', async (req, res) => {
        try {
            const currentYear = new Date().getFullYear();

            const monthlyAverages = Array.from({ length: 12 }, (_, i) => ({
                month: (i + 1).toString().padStart(2, '0'), 
                averageAmount: 0 
            }));

            const monthlyHarvestData = await Harvest.findAll({
                attributes: [
                    [sequelize.fn('strftime', '%m', sequelize.col('created_at')), 'month'],
                    [sequelize.fn('AVG', sequelize.col('amount')), 'averageAmount']
                ],
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('strftime', '%Y', sequelize.col('created_at')), currentYear.toString())
                    ]
                },
                group: ['month'],
                order: [['month', 'ASC']],
            });

            monthlyHarvestData.forEach(row => {
                const monthIndex = parseInt(row.month, 10) - 1; 
                if (monthIndex >= 0 && monthIndex < monthlyAverages.length) {
                    monthlyAverages[monthIndex].averageAmount = row.averageAmount || 0; 
                }
            });

            res.json({ message: 'Average monthly harvest data', data: monthlyHarvestData });
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: err.message });
        }
    });

    
    
    
    

    return router;
};
