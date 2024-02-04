const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.post('/api/accounts/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password
    }); // could do const body = JSON.stringify(req.body)

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/accounts/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: 'NO DATA.'
        });
    }

});

module.exports = router;
