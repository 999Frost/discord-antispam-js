const map = new Map() 
const { Message } = require('discord.js')

    /**
     * @param {Message} message
     * @param {Number} alertnumber
     * @param {Number} punishnumber
     * @param {String} punish
     * @param {Object} options
     */

async function antispam(message, alertnumber, punishnumber, punish, ignoredmember = [], options = {}) {

    if(!message) throw new Error("MESSAGE / DISCORD MESSAGE INVALID/NOT FOUND")

    if(isNaN(alertnumber)) throw new Error("ALERT NUMBER / INVALID NUMBER")

    if(isNaN(punishnumber)) throw new Error("PUNISH NUMBER / INVALID NUMBER")

    if(punish !== "kick" && punish !== "ban") throw new Error("PUNISH / INVALID PUNISH ( kick / ban )")

    if(!options || !options.alertmessage || !options.kickmessage || !options.banmessage || !options.kickerrormessage || !options.banerrormessage) {
        options = {
            alertmessage: "[member] please, stop spamming.",
            kickmessage: "[member] has been kicked for `spamming`",
            banmessage: "[member] has been banned for `spamming`",
            kickerrormessage: "[member] can't be kicked",
            banerrormessage: "[member] can't be banned"
        }
    } else {
        options = {
            alertmessage: options.alertmessage,
            kickmessage: options.kickmessage,
            banmessage: options.banmessage,
            kickerrormessage: options.kickerrormessage,
            banerrormessage: options.banerrormessage
        }
    }

            let minmsg = alertnumber
            let maxmsg = punishnumber
            if(ignoredmember?.includes(message.author.id)) return;
            if (map.has(message.author.id)) {
                const db = map.get(message.author.id)
                const { msg, timer } = db;
                const time = message.createdTimestamp - msg.createdTimestamp;
                let msgs = db.msgs
                if (time > 5000) {
                    clearTimeout(timer);
                    db.msgs = 1;
                    db.msg = message;
                    db.timer = setTimeout(() => {
                        map.delete(message.author.id);
                    }, 5000)
                    map.set(message.author.id, db)
                } else {
                    ++msgs;
                    switch (msgs) {
                        case minmsg:
                            message.channel.send(`${options.alertmessage.replace("[member]", `${message.member}`).replace("[memberusertag]", `${message.author.tag}`).replace("[memberuserusername]", `${message.author.username}`).replace("[memberuserid]", `${message.member.id}`)}`)
                            break;
                        case maxmsg:
                            if(punish === "kick") {
                            message.channel.send(`${options.kickmessage.replace("[member]", `${message.member}`).replace("[memberusertag]", `${message.author.tag}`).replace("[memberuserusername]", `${message.author.username}`).replace("[memberuserid]", `${message.member.id}`)}`)
                            message.member.kick("AntiSpam").catch(err => message.channel.send(`${options.kickerrormessage.replace("[memberusertag]", `${message.author.tag}`).replace("[memberuserusername]", `${message.author.username}`).replace("[memberuserid]", `${message.member.id}`) + " " + err}`))
                            }
                            if(punish === "ban") {
                                message.channel.send(`${options.banmessage.replace("[member]", `${message.member}`).replace("[memberusertag]", `${message.author.tag}`).replace("[memberuserusername]", `${message.author.username}`).replace("[memberuserid]", `${message.member.id}`)}`)
                                message.member.ban("AntiSpam").catch(err => message.channel.send(`${options.banerrormessage.replace("[memberusertag]", `${message.author.tag}`).replace("[memberuserusername]", `${message.author.username}`).replace("[memberuserid]", `${message.member.id}`) + " " + err}`))
                                }
                            break;
                    }
                    db.msgs = msgs;
                    map.set(message.author.id, db)
                }
            } else {
                let timerr = setTimeout(() => {
                    map.delete(message.author.id);
                }, 5000)
                map.set(message.author.id, {
                    msgs: 1,
                    msg: message,
                    timer: timerr
                })
            }
    
}

module.exports.antispam = antispam