const express = require('express');
const authenticateToken = require('../middleware/auth');
const axios = require('axios');
const { Holdings } = require('../models/index');
const router = express.Router()

router.get('/', authenticateToken, async (req, res) => {
    try{
    //finds all of a users holdings 
    const findHoldings = await Holdings.findAll({ where: { UserId: req.user.id }});
    //goes through the holdings, takes the coinIds, and stores them in an array, which gets turned into a string (join) where each coin is separated by commas 
    const coinIds = findHoldings.map(holding => holding.coinId).join(',');
    //uses axios to make a get request to the API with the coinIds
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`)

    return res.json(response.data)

    } catch (error) { 
        return res.status(500).json({ error: 'something went wrong' })
    }
})

module.exports = router;