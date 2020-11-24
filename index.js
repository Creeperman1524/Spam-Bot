//Create the bot client
const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();

//The Bot Token
const token = auth.token;

//Prefix for the commands
const prefix = '!';

//Once the bot is ready, set the status and output to console
bot.on('ready', () => {
    bot.user.setStatus('dnd')
    bot.user.setActivity(' and spamming my friends', {
        type: 'PLAYING'
    });
    console.log("The bot is now active")
})

var spam;

//Checks for messages sent
bot.on('message', (message) => {
    //Splits the message into separate words (removing the !)
    let args = message.content.substring(prefix.length).split(' ');

    //The spamming command
    switch (args[0]) {
        case 'spam':
            if (args[2] < 1000) {
                args[2] = 1000
            }
            spam = setInterval(function () {
                message.channel.send(args[1]);
            }, args[2]);
            break;
        case 'stop':
            clearInterval(spam);
            message.channel.send("Stopped!");
            break;
    }
});

//Logs the bot in
bot.login(token);