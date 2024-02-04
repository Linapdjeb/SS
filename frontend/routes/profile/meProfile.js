const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.get('/api/accounts/profile/me', async (req, res) => {
	const { access } = req.cookies;

	try {
		const apiRes = await fetch(`${process.env.API_URL}/api/accounts/profile/me`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access}`,
			},
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		return res.status(500).json({
			error: 'EROOR NO PROFILE',
		});
	}
});


module.exports = router;