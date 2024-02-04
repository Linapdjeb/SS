const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.put('/api/accounts/profile/me', async (req, res) => {
    const { access } = req.cookies;

    const body = JSON.stringify(req.body)

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/accounts/profile/me`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body,
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch (err) {
        return res.status(500).json({
            error: 'ERRROR NO EDIT PROFILE'
        });
    }

});

module.exports = router;