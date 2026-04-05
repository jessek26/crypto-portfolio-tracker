const express = require('express');
const authenticateToken = require('../middleware/auth');
const axios = require('axios');
const { Holdings } = require('../models/index');
const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
    try {
        const findHoldings = await Holdings.findAll({ where: { UserId: req.user.id }});
        
        // if no holdings, return empty object
        if (findHoldings.length === 0) {
            return res.json({});
        }

        const coinIds = findHoldings.map(holding => holding.coinId).join(',');
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`)
        return res.json(response.data)

    } catch (error) { 
    console.log('Prices error:', error.message);
    return res.status(500).json({ error: error.message })
}
})

module.exports = router;