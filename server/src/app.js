const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

const planetsRouter = require('./routes/planets/planets.route')
const launchesRouter = require('./routes/launches/launches.route')

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:4200']
}))
app.use(morgan('combined'))

app.use(express.json())
app.use(planetsRouter)
app.use(launchesRouter)

module.exports = app