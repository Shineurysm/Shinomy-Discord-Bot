let client = require('../index')
let logged = false
const path = require('path')
const ascii = require('ascii-table');
let table = new ascii("Commands");
const { readdirSync, readdir } = require('fs');
let pulls = [];
let slash = []
table.setHeading('Command Type', 'Category', 'Command', 'Command Status');

function consoleMSG(path) {
  readdirSync(path, { withFileTypes: true }).forEach((file) => {
    if (file.isFile() && file.name.match(/.js/i)) {
      let pull = require(path + "/" + file.name);
      let parts = path.substr(path.indexOf("Commands") + 9).split("/")
      if (pull.name) {
        pulls.push(pull);
        table.addRow(parts[0], parts[1], file.name, '✔️  -> Command Loaded')
      } else {
        table.addRow(parts[0], parts[1], file.name, '\u274C -> Command Error')
      }
    } else if (file.isDirectory()) {
      consoleMSG(path + "/" + file.name)
    }
  })
}

function messageCMD() {
  const msgDir = path.resolve(__dirname, '../Commands/Message Command')

  readdirSync(msgDir).forEach(dir => {
    let cmdMsg = readdirSync(`${msgDir}/${dir}/`).filter(file => file.endsWith('.js'))
    for (let file of cmdMsg) {
      let msgPull = require(`${msgDir}/${dir}/${file}`)
      if (msgPull.name) {
        client.commands.set(msgPull.name, msgPull)
      } else {
        continue;
      } if (msgPull.aliases && Array.isArray(msgPull.aliases)) msgPull.aliases.forEach(alias => client.aliases.set(alias, msgPull.name))
    }
  })
}

function slashCMD() {
  const slashDir = path.resolve(__dirname, '../Commands/Slash Command')

  readdirSync(slashDir).forEach(dir => {
    let cmdSlash = readdirSync(`${slashDir}/${dir}/`).filter(file => file.endsWith('.js'))
    for (let file of cmdSlash) {
      let slashPull = require(`${slashDir}/${dir}/${file}`)
      if (slashPull.name) {
        slash.push(slashPull);
        client.slash.set(slashPull.name, slashPull)
        client.application.commands.create({
          name: slashPull.name,
          description: slashPull.description
        })
      } 
    }
  })
}

module.exports = (client) => {
  const resDir = path.resolve(__dirname, '../Commands/')

  consoleMSG(resDir);
  messageCMD()
  client.once("ready", async () => {
    slashCMD()
  })

  console.log(table.toString());
  console.log(`[Command] Command Handler is Ready! | Total Commands: ${pulls.length}`)
}