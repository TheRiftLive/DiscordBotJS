// ==UserScript==
// @name        DiscordBot
// @description A bot to play around with Discord API using Node js and DiscordJS
// @match       node desktop/Chat/DiscordBotJs/DiscordBot.js
// ==/UserScript==

const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', message => {
    
if (!message.content.startsWith(prefix) || message.author.bot) {
    return
}
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    
    if (command === `ping`) {
        message.reply('pong') // .reply tags them
    }
    
    if (command === `server`) {
	    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`) // .send just sends a message
    }
    
    if (command === 'kick') {
        voteKickUser(message.mentions.users.first(), message.member, message)
    }
    
    if (command === 'hug') {
        hugUser(message.mentions.users.first(), message.member, message)
    }
    
    if (command === 'prune') {
	    const amount = parseInt(args[0])

	    pruneMessages(amount, message)
    }
});

function voteKickUser(votedForUser, voter, message) {
    const taggedUser = votedForUser
	message.channel.send(`${voter} wanted to kick: ${taggedUser.username}`)
}

function hugUser(huggedUser, hugger, message) {
    const taggedUser = huggedUser
	message.channel.send(`${hugger} gives ${taggedUser.username} a hug!`)
}

function pruneMessages(amount, message) {
    if (isNaN(amount)) {
		return message.reply('Please enter a valid number of message to prune.')
	}
    
    message.channel.bulkDelete(amount);
    message.channel.send(`I just deleted ${amount} messages.`)
}
