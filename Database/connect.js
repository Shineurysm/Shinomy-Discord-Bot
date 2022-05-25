const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const dirPath = path.resolve(__dirname, './models');
const length = fs.readdirSync(dirPath).length

async function connect(){
    var username = "Shineurysm"
    var password = "etangfam%4005"
    console.log('[Database] Connecting To Database....')
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rwhpu.mongodb.net/ShinDB?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
        console.log(`[Database] Connected to ${username} Database! | Total Models: ${length}`)

    
}

module.exports = connect()