

const URL = "http://localhost:8000"

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = fetch(`${URL}/planets`);
  return (await response).json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
    const response = await fetch(`${URL}/launch`);
    return (await response).json();
    // const fetchedLaunches = await response.json();
    // fetchedLaunches.sort((a,b) => {
    //   return a.flightNumber - b.flightNumber
    // })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${URL}/launch`, {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body:JSON.stringify(launch)
    })
  }
  catch(err){
    return {ok:false}
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
    return await fetch(`${URL}/launch/${id}`,{
      method: "delete"
    })
  }
  catch(err){
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};