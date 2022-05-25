const client = require('../index')

let statuss = ['hello', 'humans']

client.on('ready', () => {
    setInterval(function(){
        let status = statuss[Math.floor(Math.random() * statuss.length)]
        client.user.setActivity(status,{
            type: "WATCHING"
        })
    }, 5000)
    
    console.log('=======================')
    console.log(`[Ready] ${client.user.tag} is up and ready!`)
    console.log('=======================')
})