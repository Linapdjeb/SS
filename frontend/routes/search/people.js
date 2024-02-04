const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();


router.get('/api/search/people', async (req, res) => {
    const { access } = req.cookies;

    const { search } = req.body;

    const body = JSON.stringify({ search })

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/search?q=${search}/people`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
                'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`,
			},
            body
		});

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);
    } catch (err) {
        return res.status(500).json({
			error: 'EROOR NO USER FOUND WITH EMAIL',
		});
    }
});


module.exports = router;
