const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const conf = require("../config.js") 

module.exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed().setFooter("Sahincan ❤️ Reawen", message.guild.iconURL({dynamic: true})).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("010000")

};

exports.config = {
  name: "yardım",
  guildOnly: true,
  aliases: ["help"],
};