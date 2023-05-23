const path = require('path')
const { parse } = require('csv-parse');     //OUR CSV FILE PARSER
const fs = require('fs');                   //OUR FILE PACKAGE TO READ THE FILE

const habitablePlanet = [];                          //OUR REULTS WILL BE STORED HERE
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
                    await planets.create({
                        keplerName: data.kepler_name
                    })
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end',() => {
                // console.log(`There are ${habitablePlanet.length} planets`);
                // //console.log(habitablePlanet) WILL SHOW CSV FORMAT LIST OF ALL HABITABLE PLANETS
                // console.log(habitablePlanet.map((planet) => {
                //     return (planet['kepler_name'])
                // }))
                resolve();
            })
    })
}

module.exports = {
    planets: habitablePlanet,
    loadPlanetsData
}