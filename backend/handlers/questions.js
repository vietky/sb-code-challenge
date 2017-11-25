const { Question } = require('../models');

function update(req) {
    const question_id = req.question_id;
    const params = {};
    if (req.description) {
        params.description = req.description;
    }
    if (req.is_highlighted) {
        params.is_highlighted = req.is_highlighted;
    }
    if (req.is_shown) {
        params.is_shown = req.is_shown;
    }
    return Question.update(params, {
        where: {
            question_id
        }
    })
}

function hide(req) {
    return update({
        question_id: req.question_id,
        body: {
            is_shown: false,
            is_highlighted: false
        }
    })
}

module.exports = {
    update,
    hide
}