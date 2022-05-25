const client = require('../index.js');
const settings = require('../settings.json');
const db = require('quick.db')
const prefSchem = require('../Database/models/prefix.js')

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  let prefix;
  if (message.guild) {

    let data = await prefSchem.findOne({ guildId: message.guild.id })
    if (data === null) {
      prefix = settings.prefix
    } else {
      prefix = data.prefix;
    }
    if (!message.member) message.member = await message.guild.fetchMember(message);
  }
  if (message.mentions.has(message.client.user.id)) return message.channel.send({ content: `**Hey <@${message.author.id}>, My Prefix is:** **__${prefix}__**`, ephemeral: true });
  if (!message.content.startsWith(settings.prefix)) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd)); if (command) {
    if (!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`**You can't use this command because you dont have the following Permissions:\n\`${command.UserPerms || []}\`**`)
    if (!message.guild.me.permissions.has(command.botPerms || [])) return message.channel.send(`**I can't use this command because I dont have the following Permissions:\n\`${command.ClientPerms || []}\`**`)
  }
  if (command) command.run(client, message, args, prefix)
})