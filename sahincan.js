const Discord = require("discord.js") 
const client = new Discord.Client();    
const config = require("./config.js") 
const conf = require("./config.js") 
const db = require("quick.db")
const fs = require("fs");                
require('./util/Loader.js')(client);    
const request = require("request");

client.commands = new Discord.Collection();
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
};
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);             
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {                     
    let props = require(`./commands/${f}`);  
    console.log(`${props.config.name} komutu yüklendi.`);     
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(config.token)

client.on("message", async message => {

if (!message.author.bot && message.channel.id === conf.chat) {

let qwe = 0;

let yavsamaSozleri = [
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
  "Domates biber patlıcan, bu gece sana saplıcam...",
  "Bu ego nereden geliyor. Kuyudan mı çıkarıyorsun?",
  "çok tatlısın :blush:"
];

qwe++;

if (qwe >= 90) {
qwe = 0;
message.reply(yavsamaSozleri.random())
}
}
})

client.on("userUpdate", async (eskisahincan, yenisahincan) => {

if (yenisahincan.bot) return;

if (eskisahincan.username !== yenisahincan.username) {
if (yenisahincan.username.includes("Pain") && !yenisahincan.roles.cache.has(conf.taglıRol) && yenisahincan.discriminator.includes("1986")) {
client.channels.cache.get(conf.tagLog).send(`${yenisahincan} isimli kullanıcı tagımızı aldı!`);
yenisahincan.roles.add(conf.taglıRol);
} else if (!yenisahincan.username.includes("Pain") && !yenisahincan.discriminator.includes("1986") && !yenisahincan.roles.cache.has(conf.taglıRol)) {
yenisahincan.roles.set([conf.kayıtsızRolü]);
client.channels.cache.get(conf.tagLog).send(`${yenisahincan} isimli kullanıcı tagımızı bıraktı!`);
}
}
})

client.on("ready", async() => {
client.guilds.cache.get(conf.sunucuID).members.cache.filter(qwe=> qwe.user.username.includes("Pain") && !uye.roles.cache.has(conf.taglıRol)).array().forEach((uye, index) => {
setTimeout(() => {
if (conf.taglıRol) uye.roles.add(conf.taglıRol);
}, index*30000)
})

})

client.on("guildMemberAdd", async qwe => {
let yasakliTag = await db.get(`yasakliTag`)
let logKanalID = conf.tagLog;
let yasakliTagRolID = conf.jailRolu;

if (yasakliTag.some(asd => qwe.user.username.includes(asd))) {
qwe.roles.set([yasakliTagRolID]).catch(asd => console.log(asd));
client.channels.cache.get(logKanalID).send(`<@!${qwe.id}> ( \`${qwe.tag}\` ) kullanıcısının kullanıcı adında **yasaklı bir tag** tespit edildiği için jaile atıldı!`);
}
})

client.on("userUpdate", async (sahincanEski, sahincanYeni) => {
let yasakliTag = await db.get(`yasakliTag`)
let logKanalID = conf.tagLog
let yasakliTagRolID = conf.yasakliTagRolID;
let kayitsizRolID = conf.kayıtsızRolü;

if (sahincanEski.username !== sahincanYeni.username) {
if (yasakliTag.some(asd => sahincanYeni.username.includes(asd))) {
sahincanYeni.roles.set([yasakliTagRolID]).catch(qwe => console.log(qwe));
client.channels.cache.get(logKanalID).send(`<@!${sahincanYeni.id}> isimli kullanıcı yasaklı taglardan birini kullanıcı adına eklediği için jaile atıldı!`)
sahincanYeni.send(`Yasaklı taglardan birine sahip olduğun için jaile atıldın. Çıkardıktan sonra tekrar sunucumuzda sohbete devam edebileceksin!\n\n\`>\` Sevgiler, **${sahincanYeni.guild.name}** Yönetim Ekibi\n\nYasaklı Taglar: ${yasakliTag.map(qwe => ` \`${qwe}\` `).join(", ")}`)
}
} else if (!yasakliTag.some(asd => sahincanYeni.username.includes(asd))) {
sahincanYeni.roles.set([kayitsizRolID]).catch(qwe => console.log(qwe));
client.channels.cache.get(logKanalID).send(`<@!${sahincanYeni.id}> isimli kullanıcı yasaklı tagı bıraktığı için kayıtsıza atıldı!`);
sahincanYeni.send(`Yasaklı tagımızı bıraktığın için jailden çıkarıldın. Yetkililer ile iletişime geçebilirsin dostum!\n\n\`>\` Sevgiler, **${sahincanYeni.guild.name}** Yönetim Ekibi`)
}
})