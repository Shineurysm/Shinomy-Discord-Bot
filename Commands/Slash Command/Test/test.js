const { MessageEmbed } = require("discord.js")
module.exports = {
        name : "test",
        description : "chekling ping of bot",
        run : async (client, interaction, args) => {
              interaction.followUp('elsloo')
       }
}