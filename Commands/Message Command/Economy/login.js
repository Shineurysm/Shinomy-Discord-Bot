
var specialChar = new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)

module.exports = {
    name: 'login',
    description: 'Login your Economy Account using this command',
    usage: '>login <username> <password>',
    aliases: [],
    run: async (client, message, args) => {

        try {
            if (message.inGuild()) return message.reply({ content: `This command can only be used in <@${client.user.id}> DM.\n\`\`Usage: >signup <username> <password>\`\`\n\`\`Note: Your Economy Account is Safe With Us\`\`` })

            if (message.channel.type === 'DM') {
                const user = args[0]
                const pass = args[1]

                // USERNAME
                const dbuser = await client.models.user.findOne({ username: user })
                
                if (!user) return message.reply({ content: '**Please provide a username**' })
                if (user.length < 3) return message.reply({ content: '**It isn\'t possible for a username to only have 3 Characters in it**' })
                if (user.length > 12) return message.reply({ content: '**It isn\'t possible for a username to have more than 12 Characters in it**' })
                if (specialChar.test(user)) {
                    return message.reply({ content: '**It isn\'t possible for a username to have Special Character(s) in it**' })
                }

                // PASSWORD
                const dbpass = await client.models.user.findOne({ password: pass })

                if (!pass) return message.reply({ content: '**Please provide password**' })
                if (pass.length < 8) return message.reply({ content: '**It isn\'t possible for a password to only have 8 Characters in it**' })
                if (!dbuser || !dbpass) return message.reply({ content: `**Either your username or password is Invalid**` })

                // CHECKING 
                /*           Check if the author is already logged in           */
                const dbInOn = await client.models.user.findOne({ loggedInOn: message.author.id })
                if (dbInOn) return message.reply({ content: `**You can't login to this account because you're already logged in to** *__${dbInOn.username}__* **Account**` })

                /*           Check if someone have an access to the user account           */
                if (dbuser.isLoggedIn === true) return message.reply({ content: '**You can\'t login to this account because someone has already an access to it*' })

                /*           Check if the user who's logging in isn't the creator of the account           */
                const dmWarn = client.users.cache.get(dbuser.createdBy)
                if (message.author.id !== dbuser.createdBy) dmWarn.send({ content: `**Hello ${dmWarn}, ${message.author.tag} logged in your account.**` })

                // LOGIN PROCESSING
                if (dbuser && dbpass) {
                    dbuser.loggedInOn = message.author.id
                    dbuser.isLoggedIn = true
                    await dbuser.save()
                    return message.reply({ content: `**You have successfully logged in to __${dbuser.username}__ economy account**` })
                }
            }
        }
        catch (error) {
            return message.reply({ content: `**An error occurred:\n\`\`${error}\`\`**` })
        }
    }
}