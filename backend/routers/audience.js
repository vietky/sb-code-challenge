const express = require('express')
const router = express.Router()
const {
    events,
    questions,
    user_actions,
    defaultCallback
} = require('../handlers/')

router.get('/events/:event_code', events.getByCode)
router.get('/events/:event_code/feed', defaultCallback)
router.post('/events/:event_code/questions/', questions.create)
router.put('/events/:event_code/questions/:question_id/vote', user_actions.vote)

module.exports = router