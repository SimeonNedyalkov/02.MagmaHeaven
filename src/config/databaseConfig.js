const mongoose = require('mongoose')
require('../models/User')
require('../models/Volcano')

async function databaseConfig(){
    await mongoose.connect('mongodb://localhost:27017/magma-haven')
    console.log("Database connected")

}
module.exports = {
    databaseConfig
}