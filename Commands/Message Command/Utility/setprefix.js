const {Permissions} = require('discord.js')
const Schema = require('../../../Database/models/prefix')
const settings = require('../../../settings.json')
module.exports = {
    name: 'setprefix',
    category: 'utility',
    aliases: ['setpref'],
    run: async (client, message, args, prefix) => {

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply({ content: `you dont have **ADMINISTRATOR** permission to use this command` })
    const newprefix = args[0]
    if(!newprefix) return message.reply('Enter New Prefix')
    if(newprefix.length > 5) return message.channel.send("Invalid Prefix, Prefix Is Too Long")

    Schema.findOne({ guildId: message.guild.id }, async(err, data) => {
        if(data) {
            data.prefix = newprefix
            await data.save()
            if(data.prefix === settings.prefix) {
                return message.channel.send(`**This Server Prefix Has Been *Reverted Back* To:** __**${newprefix}**__`)
            } else {
                message.channel.send(`**This Server Prefix Has Been Updated To:** __**${newprefix}**__\n\`\`My Original Prefix: >\`\``)
            }        
        } else {
            await new Schema({ guildId: message.guild.id, prefix: newprefix }).save()
            if(Schema.prefix === settings.prefix) {
                return message.channel.send(`**This Server Prefix Has Been *Reverted Back* To:** __**${newprefix}**__`)
            } else {
                message.channel.send(`**This Server Prefix Has Been Set To:** __**${newprefix}**__\n\`\`My Original Prefix: >\`\``)
            }      
        }
    })
 }
}

