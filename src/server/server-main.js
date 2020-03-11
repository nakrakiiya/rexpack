const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
// const debug = require('debug')('rexpack:server')

const usersRouter = require('./routes/users')

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}


let server
const port = normalizePort(process.env.PORT || '8080')


/**
 * Event listener for HTTP server "error" event.
 */

const onError = function (error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = function () {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    // debug('Listening on ' + bind)
    console.info('Listening on ' + bind)
}

module.exports = function (app) {
    app.set('port', port)

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    app.use('/users', usersRouter)

    server = http.createServer(app)
    server.on('error', onError)
    server.on('listening', onListening)
    server.listen(port)
}