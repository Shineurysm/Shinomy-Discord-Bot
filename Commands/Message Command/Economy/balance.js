const { Discord, MessageEmbed } = require('discord.js')
module.exports = {
    name: 'balance',
    description: 'This Command Will Show Your Economy\'s Balance Account',
    usage: '>balance / >bal',
    aliases: ['bal'],
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author


        Schema.findOne({ _id: user.id }, async (err, data) => {
            if(!data) return message.reply({ content: '**You or the mentioned User don\'t have an Economy Account, please make one:\n``>signup``**'})
            const ove = data.Shi + data.Shredit
            const shi = data.Shi
            const shredit = data.Shredit
            let balEmbed = new MessageEmbed()
            .setAuthor({name: `${user.username}'s Balance`, iconURL: `${user.avatarURL({dynamic: true, size: 1024})}`})
            .setDescription(`**Shi:** <a:shi:975042864029519872>${shi}\n**Shredit Card** ☬ ${shredit}\n**Overall:** ☬ ${ove}`)
            await message.reply({ embeds: [balEmbed] })
        })
        
    }
}
