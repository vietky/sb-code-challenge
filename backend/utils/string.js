const DICT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const DICT_LENGTH = DICT.length

function generate(length = 50) {
    let s = '';
    for (let i = 0; i < length; i++) {
        s += DICT[Math.floor(Math.random() * DICT_LENGTH)]
    }
    return s;
}

module.exports = {
    generate
}