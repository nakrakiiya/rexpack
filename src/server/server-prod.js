import express from 'express'
import server_main from './server-main'

const app = express()
const DIST_DIR = __dirname


app.use(express.static(DIST_DIR))

server_main(app)