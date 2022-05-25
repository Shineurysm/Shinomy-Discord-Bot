var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
var specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const User = require('../../../Database/models/user')

module.exports = {
    name: "signup",
    description: "Signup for an Economy Account",
    usage: ">signup",
    aliases: [],
    run: async (client, message, args) => {
        //const userToLow = userargs.toLowerCase()
        //const user = userToLow.charAt(0).toUpperCase() + userToLow.substring(1, userToLow.length)

        try {
            //message is inguild
            if (message.inGuild()) {
                return message.reply({ content: `This command can only be used in <@${client.user.id}> DM.\n\`\`Usage: >signup <username> <password>\`\`\n\`\`Note: Your Economy Account is Safe With Us\`\`` })
            }

            //message is in DM
            if (message.channel.type === 'DM') {

                // USERNAME
                const user = args[0]
                const pass = args[1]

                if (!user) return message.reply({ content: '**Please provide a username for your Economy Account!\n``Correct Usage: >signup <username> <password>``**' })
                if (user.length < 3) return message.reply({ content: '**[__Too Short__]** **Your Username must have atleast 3 Characters**' })
                if (user.length > 12) return message.reply({ content: '**[__Too Long__]** **You Username must only have 12 Characters**' })
                if (specialChar.test(user)) {
                    return message.reply({ content: '**Username\'s must not have any Special Characters**' })
                }

                // PASSWORD
                let str
                let med
                let weak

                if (strongRegex.test(pass)) {
                    str = 'Strong'
                }
                if (mediumRegex.test(pass)) {
                    med = 'Medium'
                }
                if (!strongRegex.test(pass) && !mediumRegex.test(pass)) {
                    weak = 'Weak'
                }
                if (!pass) return message.reply({ content: '**Please provide a password for your Economy Account!**' })
                if (pass.length < 8) return message.reply({ content: '**[__Too Short__]** **Your Password must have atleast 8 Characters**' })
                
                // CREATING THE ACCOUNT
                const asteriskedPass = pass.replace(/./g, '⁎')
                User.findOne({ createdBy: message.author.id }, async (err, data) => {
                    if (data) {
                        return message.reply({ content: `**You already have made an Account and the Username of the Account that you made is: \`\`${data.username}\`\`\n\`\`Note: if you forget your password you can just run the command >recoveraccount\`\`**` })
                    } else {
                        try
                        {
                            await new User({
                                loggedInOn: "0",
                                createdBy: message.author.id,
                                isLoggedIn: false,
                                username: user,
                                password: pass,
                            }).save()
                            return message.reply({ content: `**You have successfully made your new Economy Account, Here's the details:\n\`\`Username: ${user}\`\`\n\`\`Password: ${asteriskedPass} \`\`\n\`\`Password Strength: ${str || med || weak}\`\`**` })
                        }
                        catch(error) {
                            if(error.code == '11000') {
                                return message.reply({ content: `**${user} username already exist, Pick a new one!**`})
                            }
                        }
                    }
                })
            }
        }
        catch (error) {
            return message.reply({ content: `**An error occurred:\n\`\`${error}\`\`**`})
        }

    }
}