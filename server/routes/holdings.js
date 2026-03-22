const express = require('express')
const authenticateToken = require('../middleware/auth')
const { Holdings } = require('../models/index')

const router = express.Router()

//gets all of a users holdings
router.get('/', authenticateToken, async (req, res) => {
    try {
    const findHoldings = await Holdings.findAll({ where: {UserId: req.user.id}})
    return res.json(findHoldings)

}   catch(error) {
    return res.status(500).json({ error:'something went wrong' })
}
}) 

router.post('/', authenticateToken, async (req, res) => {
    try{
        const{ coinId, coinName, quantity, purchasePrice } = req.body

        if(!coinId || !coinName || !quantity || !purchasePrice) {
            return res.status(400).json({ error:'missing information' })
        }

        const newHolding = await Holdings.create({ UserId: req.user.id, coinId, coinName, quantity, purchasePrice })
        return res.status(201).json(newHolding)

    }   catch(error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

router.put('/:id', authenticateToken, async (req, res) => {
    try{ 
    const holdingId = req.params.id;
    const { quantity, purchasePrice } = req.body;

    if(!quantity || !purchasePrice){
        return res.status(400).json({ error:'missing information' })
    } 

    const findHolding = await Holdings.findOne({ where: { id: holdingId, UserId: req.user.id } })
    if(!findHolding){
        return res.status(404).json({ error:'not found' });
    }

    await findHolding.update({ quantity, purchasePrice})
    return res.json(findHolding);

    } catch(error){
        res.status(500).json({ error: 'Something went wrong' })
    }

})

router.delete('/:id', authenticateToken, async (req, res) => {
    try{
        const holdingId = req.params.id; 
        const findHolding = await Holdings.findOne({ where: { id: holdingId, UserId: req.user.id }})

        if(!findHolding) {
            return res.status(404).json({ error:'holding not found' });
        }

        await findHolding.destroy();
        return res.json('Holding deleted!')

    }   catch(error){
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = router