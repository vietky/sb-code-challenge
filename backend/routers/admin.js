const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authentication')
const {
    events,
    questions
} = require('../handlers/')

router.get('/events/', auth, events.getByUser)
router.post('/events/', auth, events.create)

router.get('/events/:event_code', auth, events.getByCode)
router.put('/events/:event_code', auth, events.update)

router.put('/questions/:question_id', auth, questions.update)
router.delete('/questions/:question_id', auth, questions.hide)

module.exports = router