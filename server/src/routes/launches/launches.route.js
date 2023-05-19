const express = require('express');

const launchesRouter = express.Router();

const {getAllLaunches,httpAddNewLaunch,httpAbortLaunch} = require('./launches.controller')

launchesRouter.get('/launch', getAllLaunches)
launchesRouter.post('/launch', httpAddNewLaunch)
launchesRouter.delete('/launch/:id', httpAbortLaunch)

module.exports = launchesRouter;