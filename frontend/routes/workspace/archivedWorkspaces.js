const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.get('/api/workspace/archived', async (req, res) => {
    const { access } = req.cookies;

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/workspace/archived`, {
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
            error: 'ERROR NO WORSPACE ARCHIVED FOUNF'
        });
    }

});


module.exports = router;