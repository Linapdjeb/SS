const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post('/api/accounts/verify', async (req, res) => {
	const { access } = req.cookies;

	const body = JSON.stringify({
		token: access,
	});

	try {
		const apiRes = await fetch(`${process.env.API_URL}/api/token/verify/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'ERROR! DO NOT KNOW WHO ARE YOU!',
		});
	}
});

module.exports = router;