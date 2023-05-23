const http = require('http');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000;

const app = require('./app')
const {loadPlanetsData} = require('./models/planets.model')

const MONGO_URL = 'mongodb+srv://sidkalyani9:Sbk91902002@cluster0.ldt7x7f.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log("MongoDB Connection Established!")
})

mongoose.connection.on('error', (err) => {
    console.log(err)
})

async function startServer(){
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`Server started at port: ${PORT}!`)
    })
}

startServer();