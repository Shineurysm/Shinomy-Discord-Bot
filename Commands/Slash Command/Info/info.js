const { MessageEmbed } = require("discord.js")
module.exports = {
        name : "info",
        description : "check bot info",
        run : async (client, interaction, args) => {
              interaction.followUp(`Hello!, i am ${client.user.username}`)
       }
}