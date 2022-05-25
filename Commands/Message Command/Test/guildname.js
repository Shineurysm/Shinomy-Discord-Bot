module.exports = {
    name: 'guildname',
    run: async (client, message, args) => {
        message.reply({ content: `This server name is ${message.guild.name}`})
    }
}