const express = require('express')
const router = express.Router()

const defaultCallback = (req, res) => {
    res.send('This site is underconstruction');
}

router.get('/events/', defaultCallback)
router.post('/events/', defaultCallback)
router.put('/events/:event_id', defaultCallback)
router.put('/events/:event_id/hightlight', defaultCallback)
router.delete('/events/:event_id', defaultCallback)

module.exports = router;