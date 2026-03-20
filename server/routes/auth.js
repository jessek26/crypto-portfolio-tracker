const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models/index');

const router = express.Router();

router.post('/register', async (req,res) => {
    const { email, password } = req.body;
    
    //looks for the email already being used by a user
    const exisitingUser = await User.findOne({ where: { email }});

    //if the email is already in use
    if(exisitingUser) {
        return res.status(400).json({error: 'email in use'})
    }

    //using bcrypt to has password w/ 10 salt rounds 
    const hashedPassword = await bcrypt.hash(password, 10);

    //waits for user to be created in the database 
    const user = await User.create({ email, password: hashedPassword })
})