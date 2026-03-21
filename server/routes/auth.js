const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models/index');

const router = express.Router();

//register route
router.post('/register', async (req,res) => {
    try {
    const email = req.body?.email;
    const password = req.body?.password;

     //if email or password is left empty
    if(!email || !password) {
        return res.status(400).json({ error: 'Email and password are required'});
    }

    //looks for the email already being used by a user
    const existingUser = await User.findOne({ where: { email }});

    //if the email is already in use
    if(existingUser) {
        return res.status(400).json({error: 'email in use'});
    }

    //using bcrypt to has password w/ 10 salt rounds 
    const hashedPassword = await bcrypt.hash(password, 10);

    //waits for user to be created in the database 
    const user = await User.create({ email, password: hashedPassword })

    //creates a token for the user
    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.status(201).json({ token: token })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

//login route
router.post('/login', async (req, res)  => {
    try{
       const email = req.body?.email;
       const password = req.body?.password;

        //if email or password is left empty
    if(!email || !password) {
        return res.status(400).json({ error: 'Email and password are required'});
    }


        const existingUser = await User.findOne({ where: { email }});
        if(!existingUser) {
            return res.status(400).json({error: 'invalid email or password'});
        }
 
         //find and compare users password
        const passwordCheck = await bcrypt.compare(password, existingUser.password)

        if (!passwordCheck) {
            return res.status(400).json({ error: 'invalid email or password' });
        }

        const token = jsonwebtoken.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token: token });


    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = router;