const {readdirSync} = require('fs');
let logged = false;
module.exports = (client) => {
  readdirSync("./Events/").forEach((file) => {
    var events = readdirSync("./Events/").filter((file) => file.endsWith(".js"))
    for(let file of events) {
      let pull = require(`../Events/${file}`);
      if(pull.name){
        client.events.set(pull.name, pull)
      } else {
        continue;
      }
    }
    if(!logged) {
      console.log(`[Event] Event Handler is Ready! | Total Events: ${events.length}`)
      logged = true
    }
  })
}