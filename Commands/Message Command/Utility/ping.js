const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Returns latency and API ping',
    run : async(client, message, prefix) => {
        if(!message.content.startsWith(prefix)) return;
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.reply({ embeds: [embed] })
            msg.delete()
    }
}