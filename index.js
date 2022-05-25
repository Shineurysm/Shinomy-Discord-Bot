const { Discord, Client, Intents, Collection, MessageEmbed} = require('discord.js')
const allintents = new Intents(32767);
const client = new Client({ partials: ['CHANNEL'], intents: allintents })
const settings = require('./settings.json')
const fs = require('fs')
module.exports = client

client.models = { user: require('./Database/models/user')}
client.slash = new Collection()
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");

["command", "event"].forEach(handler => {
    require(`./Handlers/${handler}`)(client);
});
require("./Database/connect");


client.login(settings.tok)