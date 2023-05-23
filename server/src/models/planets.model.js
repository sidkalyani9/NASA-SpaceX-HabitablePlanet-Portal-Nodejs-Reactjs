const path = require('path')
const { parse } = require('csv-parse');     //OUR CSV FILE PARSER
const fs = require('fs');                   //OUR FILE PACKAGE TO READ THE FILE

// const habitablePlanet = [];                          //OUR REULTS WILL BE STORED HERE
const planets = require('./planets.mongo')

function checkHabitability(planetData){
    return  planetData['koi_disposition'] === 'CONFIRMED' &&
            planetData['koi_insol'] > 0.36 && planetData['koi_insol'] <1.11 &&
            planetData['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve,reject) => {
        
        fs.createReadStream(path.join(__dirname,'kepler_data.csv'))
            .pipe(parse({                           //PARSE FUNCTION WILL CONVERT BYTES TO READABLE CSV STRING
                comment: '#',
                columns: true,
            }))
            .on('data', async(data) => {
                if(checkHabitability(data)) {
                    await savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end',async () => {
                const countPlanets = (await getPlanets()).length
                console.log(`${countPlanets} habitable Planets found!`)
                resolve();
            })
    })
}

async function getPlanets(){
    return await planets.find({})
}

async function savePlanet(planet){
    try{
        planets.updateOne({
            keplerName: planet['kepler_name']
        },
        {
            keplerName: planet['kepler_name']
        },
        {
            upsert: true
        }).exec()
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    loadPlanetsData,
    getPlanets
}