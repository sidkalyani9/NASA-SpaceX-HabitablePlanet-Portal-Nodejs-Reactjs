const {getAllLaunches,scheduleNewLaunch, existsLaunch, abortedLaunch} = require('../../models/launches.model')

async function HttpGetAllLaunches(req,res) {
    
    return await res.status(200).json(await getAllLaunches())
    
}

async function httpAddNewLaunch(req,res) {
    const launch = req.body;

    // VALIDATION
    if( !launch.mission || !launch.launchDate || !launch.rocket || !launch.destination){
        return res.status(400).json({
            error: "Missing required property"
        })
    }

    // Dates can't be posted in APIs, So we'll do:-
    launch.launchDate = new Date(launch.launchDate)
    
    // VALIDATING DATE
    if(launch.launchDate.toString() === "Invalid Date"){
        return res.status(400).json({
            error: "Invalide Date Entered"
        })
    }

    await scheduleNewLaunch(launch)

    return res.status(201).json(launch) 
}

async function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);

    // if(!existsLaunch(launchId)){
    //     res.status(404).json({
    //         error: "Aborted Entity does not exist"
    //     })
    // }

    const launch = await abortedLaunch(launchId);
    return await res.status(200).json(launch); 

}

module.exports = {
    HttpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};