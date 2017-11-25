class Logger {
    info(...data) {
        console.log(...data);
    }
    error(...data) {
        console.error(...data);
    }
}

module.exports = new Logger();