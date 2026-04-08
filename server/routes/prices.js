const express = require('express');
const authenticateToken = require('../middleware/auth');
const axios = require('axios');
const { Holdings } = require('../models/index');
const router = express.Router()

let priceCache = {};
let lastFetched = null;



router.get('/', authenticateToken, async (req, res) => {
    try {
        const findHoldings = await Holdings.findAll({ where: { UserId: req.user.id }});
        
        if (findHoldings.length === 0) {
            return res.json({});
        }

        const coinIds = findHoldings.map(holding => holding.coinId).join(',');
        
        // only fetch from CoinGecko if cache is older than 60 seconds
        const now = Date.now();
        if (!lastFetched || now - lastFetched > 60000) {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`,
            { headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY } }
        );            
            priceCache = response.data;
            lastFetched = now;
        }

        return res.json(priceCache);

    } catch (error) { 
        console.log('Prices error:', error.message);
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router;