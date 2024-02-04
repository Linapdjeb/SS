const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();

router.put('/api/task/edit', async (req, res) => {
    const { access } = req.cookies;

    const body = JSON.stringify(req.body)

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/task/edit/${req.body.task_id}`, {
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
            error: 'ERRROR NO TAKS EDITED'
        });
    }

});


module.exports = router;