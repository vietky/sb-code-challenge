const express = require('express')
const router = express.Router()

const defaultCallback = (req, res) => {
    res.send('This site is underconstruction');
}

router.get('/events/:event_code', defaultCallback)
router.get('/events/:event_code/feed', defaultCallback)
router.post('/events/:event_code/questions/', defaultCallback)
router.put('/events/:event_code/questions/:question_id/vote', defaultCallback)

module.exports = router;