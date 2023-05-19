const launches = new Map();
let latestFlightNumber = 1;

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

launches.set(launch.flightNumber, launch)

// function httpGetAllLaunches(){
//     return Array.from(launces.values());
// }

function existsLaunch(launchId){
    return launches.has(launchId);
}

function addNewLaunch(launch){
    latestFlightNumber++;

    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming:true,
        success: true,
        customers: ['Siddharth','Space X']
    }))
}

function abortedLaunch(launchId){
    const aborted = launches.get(launchId);
    aborted.success = false;
    aborted.upcoming = false;
    
    return aborted;
}

module.exports = {
    launches,
    addNewLaunch,
    existsLaunch,
    abortedLaunch
};