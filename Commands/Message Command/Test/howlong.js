module.exports = {
    name: 'howlong',
    description: 'how long has that mention member for',
    usage: '>howlong <member>',
    aliases: [],
    run: async (client, message, args, prefix) => {
        const user = message.mentions.members.first() || message.member

        message.channel.send({ content: `<@${user.id}> has been in this server for <t:${Math.floor(user.joinedTimestamp / 1000)}:D>` })
    }
}