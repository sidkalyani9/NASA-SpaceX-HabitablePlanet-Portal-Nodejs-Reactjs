const express = require('express');

const launchesRouter = express.Router();

const {HttpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch} = require('./launches.controller')

launchesRouter.get('/launch', HttpGetAllLaunches)
launchesRouter.post('/launch', httpAddNewLaunch)
// launchesRouter.delete('/launch/:id', httpAbortLaunch)

module.exports = launchesRouter;