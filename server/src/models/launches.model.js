// const launches = new Map();
let latestFlightNumber = 1;

const launches = require('./launches.mongo')

const launch = {
    flightNumber:1,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('May 17, 2023'),
    destination: 'Kepler-442 b',
    customer: ['NASA', 'Siddharth'],
    upcoming: true,
    success: true
}

saveLaunch(launch)
// launches.set(launch.flightNumber, launch)

// function httpGetAllLaunches(){
//     return Array.from(launces.values());
// }

// function existsLaunch(launchId){
//     return launches.has(launchId);
// }

function addNewLaunch(launch){
    latestFlightNumber++;

    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming:true,
        success: true,
        customers: ['Siddharth','Space X']
    }))
}

async function scheduleNewLaunch(launch){
    const latestFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        customers: ['Siddharth','Space X', 'NASA'],
        flightNumber: latestFlightNumber
    })

    await saveLaunch(newLaunch)
}

async function getAllLaunches(){
    return await launches.find({});
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne({}).sort('-flightNumber')

    // IF NO LAUNCHES HAVE BEEN DONE
    if(!latestLaunch){
        return 1;
    }
    return latestLaunch.flightNumber
}

function abortedLaunch(launchId){
    const aborted = launches.get(launchId);
    aborted.success = false;
    aborted.upcoming = false;
    
    return aborted;
}

async function saveLaunch(launch) {
    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, 
    launch, 
    {
        upsert: true
    })
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    // existsLaunch,
    abortedLaunch
};