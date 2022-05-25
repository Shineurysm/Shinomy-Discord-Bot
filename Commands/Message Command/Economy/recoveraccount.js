var nodemailer = require('nodemailer');

const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
module.exports = {
    name: 'recoveraccount',
    description: 'This will let you know your Economy Account\'s Details',
    usage: '>recoveraccount <email>',
    aliases: ['recoveracc'],
    run: async(client, message, args) => {
        const checkRecover = await client.models.user.findOne({ createdBy: message.author.id})
        if(!checkRecover) return message.reply({ content: '**You don\'t have an Economy Account for you to use this command.**'})

        const em = args[0]
        if(!em) return message.reply('**Input your email next to the command so that we can email your Account details to you.\n``Note: PLEASE! dont use your real main email account since we cant be sure if its safe to input your email in discord.``**')
        if(!emailRegex.test(em)) {
            return message.reply('**Your email must be in correct format.\n``>recoveraccount thisismygmail@(gmail,yahoo,etc).com``**')
        } else {
          var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'shinomy.discord.bot@gmail.com',
              pass: 'iamshinomydiscordbot'
            }
          });
  
          var mailOptions = {
            from: 'Shinomy Bot',
            to: em,
            subject: 'Shinomy-Discord-Bot(no-reply)',
            text: `**This is an automated recovery account email from Shinomy Discord Bot**
              
            Hello ${message.author.username}!, i am Shinomy from Discord and i detected that you are trying to recover your economy account and here it is!
            
            Username: ${checkRecover.username}
            Password: ${checkRecover.password}`
          };
  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return message.reply(`**An error occurred:\n\`\`${error}\`\`**`);
            } else {
              return message.reply(`**Successfully sent ${message.author.username} economy account details to \`\`${em}\`\`**`);
            }
          })
        }

        

    }
}