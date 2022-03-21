<p align="center"><a href="https://nodei.co/npm/discord-antispam-js/"><img src="https://nodei.co/npm/discord-antispam-js.png"></a></p>

## ⚙️・Installation
To install the module, run this in your terminal :
```
npm i discord-antispam-js
```
or this 
```
yarn add discord-antispam-js
```

## 🏹・Example

This is an example of an easy discord bot using my package
```js
const {Client} = require('discord.js') // import Client from discord.js
const client = new Client({intents: 32767}) // create a new Client
const { antispam } = require('discord-antispam-js') // import my package's function

client.login("ur token here") // your discord token


client.on("ready", () => {
    console.log(`Connected on ${client.user.tag}!`) // just for know if the bot is ready
})

client.on("messageCreate", async message => {
    antispam(
    message // put the discord message, for me it will be the message of the event messageCreate
    , 3 // put the minimum message, at 3 messages the bot will alert the member for stop spamming
    , 6 // put the maximum message, at 6 messages, the bot will kick/ban the member
    , "kick" // put the punish, you have only 2 choices : kick / ban
    , [] // put the member(s) id(s), the members can bypass the antispam
    , options // put an object of the options
     = { 
            alertmessage: "[member] please, stop spamming.", // it will be the message of the minimum message, for me, at 3 messages, the bot will say @Frost.wrld please, stop spamming
            kickmessage: "[member] has been kicked for `spamming`", // it will be the message of the maximum message, for me, at 6 messages, the bot will kick the member if the punish is "kick"
            banmessage: "[member] has been banned for `spamming`", // it will be the message of the maximum message, for me, at 6 messages, the bot will ban the member if the punish is "ban"
            kickerrormessage: "[member] can't be kicked", // it will the error message if the bot can't kick the member
            banerrormessage: "[member] can't be banned" // it will the error message if the bot can't ban the member
    })
})
```

## Support
If you need help, contact me on discord [here](https://discord.com/users/548028946097111045)
You can join my server [here](https://discord.gg/8J4rsqmRrp)
