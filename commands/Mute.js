const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const conf = require("../config.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed().setFooter("Sahincan ❤️ Reawen", message.guild.iconURL({dynamic: true})).setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("010000")

if (!conf.muteSorumlusu.some(qwe => message.member.roles.cache.has(qwe)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Yeterli yetkilere sahip değilsin!`))

let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let süre = args[1];
let sebep = args.splice(2).join(" ") || "Sebep Belirtilmedi!"
if (!üye) return message.channel.send(embed.setDescription("Geçerli bir kullanıcı belirtmelisin! [`!mute @SahincanID 5m Düzeni Bozma`]"));
if (üye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription("Kendinden üst/eşit yetkide birisine ceza uygulayamazsın!"))
if (!süre || !ms(süre)) return message.channel.send(embed.setDescription("Geçerli bir süre belirtmelisin! [`!mute @SahincanID 5m Düzeni Bozma`]"));


if(üye) üye.roles.add(conf.muteRolu);
message.channel.send(embed.setDescription(`${üye} isimli kullanıcı ${message.author} tarafından "${süre}" süresince chatte mutelendi! [\`${sebep}\`]`));
message.guild.channels.cache.get(conf.muteLog).send(embed.setDescription(`${üye} isimli kullanıcı ${message.author} tarafından "${süre}" süresince chatte mutelendi! [\`${sebep}\`]`));

db.set(`muteli.${üye.id}`, true);
db.push(`sicil.${üye.id}`, {Yetkili: message.author.id, Sebep: sebep, Ceza: "mute"});

setTimeout(async function() {
üye.roles.remove(config.muteRolu);
db.delete(`muteli.${üye.id}`);
message.channel.send(embed.setDescription(`${üye} kullanıcısının cezası süresi bittiği için kaldırıldı [\`${sebep}\`]`));
message.guild.channels.cache.get(conf.muteLog).send(embed.setDescription(`${üye} kullanıcısının cezası süresi bittiği için kaldırıldı [\`${sebep}\`]`));
}, ms(süre));
};

exports.config = {
  name: "mute",
  guildOnly: true,
  aliases: ["tempmute", "chatmute"],
};