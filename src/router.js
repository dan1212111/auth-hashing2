const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const router = express.Router()
const jwtSecret = 'mysecretkey';

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });

    res.json({ data: createdUser})
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password'})
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password)
    if(!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password '})
    }

    const token = jwt.sign({ username }, jwtSecret);

    res.json({ data: token })

})

module.exports = router 










module.exports = router; 