const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  http.get(`http://gramophone.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const managers = ["Oktay"];

// init sqlite db
var fs = require("fs");
var dbFile = "./data.db";
var exists = fs.existsSync(dbFile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbFile);

client.request = require("request");
client.music = require("discord.js-musicbot-addon");
client.giphy = require("giphy-api")(config.giphy);

client.on("ready", () => {
  console.log(client.members);

  console.log(`Logged in as ${client.user.tag}!`);
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity("Naber canısı ?");

  //var generalChannel = client.channels.get("671811997444341796"); // Replace with known channel ID
  //var usebotChannel = client.channels.get("539974222525628416"); // Replace with known channel ID
  //generalChannel.send("bir daha duymayım yoksa sonun olur");
  //usebotChannel.send("Beğenmiyorsan bsg ");
});
client.on("guildCreate", guild => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  if (message.author.bot) return;
  
/*
  
    if (message.content.toLowerCase() === 'amk' || message.content.toLowerCase() === 'mk' || message.content.toLowerCase() === 'aq' || message.content.toLowerCase() === 'ag'){
      message.reply('Ben de senin!');
    }
    if (message.content.toLowerCase().search('amk') > 0 || message.content.toLowerCase().search('mk') > 0 || message.content.toLowerCase().search('aq') > 0){
      message.reply('Ben de senin!');
    }
*/
    // message.channel.send(message.content.toLowerCase());

  if (
    message.content.toLowerCase() === "görüşürüz tobor" ||
    message.content.toLowerCase() === "tobor görüşürüz" ||
    message.content.toLowerCase() === "tobor bb" ||
    message.content.toLowerCase() === "bb tobor"
  ) {
    message.reply("Tamam canısı, grşrz sçs kib aeo öptm bb");
  } else if (message.content.toLowerCase() === "toboş") {
    message.reply("Sensin toboş, hadsiz!");
  } else if (
    message.content.toLowerCase() === "selam tobor" ||
    message.content.toLowerCase() === "tobor selam"
  ) {
    message.reply("Selam canısı naber");
  } else if (
    message.content.toLowerCase() === "naber tobor" ||
    message.content.toLowerCase() === "tobor naber"
  ) {
    message.reply("İyidir canısı senden naber");
  } else if (message.content.toLowerCase().search("tobor") > 0) {
    message.reply("öyle diyorsan öyledir canısı");
  } else if (
    //message.isMentioned(client.user) ||
    message.content.toLowerCase() === "tobor" ||
    message.content.toLowerCase().search(" tobor") > 0 ||
    message.content.toLowerCase().search("tobor ") > 0
  ) {
    message.reply("Efendim canısı");
  }

  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "kapaac") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");

    message.channel.send("kapadım");
    client.destroy(config.token);
    setTimeout(function() {
      client.login(config.token);
      message.channel.send("açtım");
    }, 30000);
  }

  if (command == "kapa") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");

    message.channel.send("kapadım");
    client.destroy(config.token);
  }

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        client.ping
      )}ms`
    );
  }
  if (command === "prefix") {
    return;

    let prefix = args.join(" ");
    let fs = require("fs");

    fs.writeFileSync("./config.json", { token: config.token, prefix: prefix });

    message.channel.send(`New prefix: ${prefix}`);
    return;
  }
  if (command === "say") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
  }
  if (command === "kick") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
      return message.reply(
        "I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
      );
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";
    await member
      .kick(reason)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't kick because of : ${error}`
        )
      );
    message.reply(
      `${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`
    );
  }
  if (command === "ban") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable)
      return message.reply(
        "I cannot ban this user! Do they have a higher role? Do I have ban permissions?"
      );
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";
    await member
      .ban(reason)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't ban because of : ${error}`
        )
      );
    message.reply(
      `${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`
    );
  }
  if (command === "banned") {
    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    message.reply("Tamam abi hemen hallediyorum.");
    message.channel.send(`<@${member.user.id}> sen bittin koçum`);
  }
  if (command === "clear" || command === "clean") {
/*    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");
    var deleteCount = parseInt(args[0], 10);
*/
    if (isNaN(deleteCount)) {
      var deleteCount = 99;
    }

    if (!deleteCount || deleteCount < 1 || deleteCount > 99)
      return message.reply(
        "Please provide a number between 1 and 99 for the number of messages to delete"
      );

    const fetched = await message.channel.fetchMessages({
      limit: deleteCount + 1
    });
    message.channel
      .bulkDelete(fetched)
      .catch(error =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
  }
  if (command === "info") {
    let users = {
      Oktay: "bitch, i am a wizard<3 !",
      CaptainOrodreth: "Oralet <3 !",
      Sad: "Sediciiimm <3 !",
      Mü: "ÇapkınMühendis <3 !",
      HyperSeek: "Hell yeah <3 !",
      Rammas: "Lanet olası doğuş <3 !"
    };

    let randResult = [
      "O bir adam <3 !",
      "O bir boğa <3 !",
      "O bir yılan <3 !",
      "O bir aslan <3 !",
      "O bir koç <3 !",
      "O bir Mutfak Robotu <3 !",
      "Her Şeyin Başladığı An Uzay Gemisi Şimdi Onun Bileğinde Bir Sır ve Güç Gezi Artık O Süper Güçlü Sıradan Biri Değil O ben Ten Artık Onu Gördüğünüzde Sürpriz Bekleyin Birden Bire Uzaylıya Dönecek O Bilin Zayıf, Tuhaf, hızlı Ve Güçlü Her Kalıba Girer O Ben Ten Bütün Gücü Beraberinde Kötülüğün Düşmanı Evren İle Hiç Durmaz Tuzaklar Kesilmedikçe Bütün Bunları Yapan Kim Sizce O Ben Ten <3"
    ];

    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      message.channel.send(randResult[getRandomInt(6)]);

      //return message.reply("Please mention a valid member of this server");
    } else {
      message.channel.send(users[member.user.username]);
    }

    return;
  }
  if (command === "dice") {
    if (args.length === 0) {
      return message.reply(getRandomInt(20) + " geldi gardaşım");
    } else {
      let dicePoll = args[0].split("d");
      var piece = dicePoll[0];
      var dice = dicePoll[1];

      if (!dice) {
        var piece = 1;
        var dice = args[0];
      }

      var roll = [];
      var sum = 0;

      for (let i = 0; i < piece; i++) {
        roll[i] = getRandomInt(dice);
        sum += roll[i];
      }

      if (roll.length > 500) {
        if (args[1]) {
          message.reply(sum + parseInt(args[1]) + " geldi gardaşım.");
        } else {
          message.reply(sum + " geldi gardaşım.");
        }
      } else {
        if (args[1]) {
          message.reply(
            sum +
              parseInt(args[1]) +
              " geldi gardaşım. (" +
              roll +
              "+" +
              args[1] +
              ")"
          );
        } else {
          message.reply(sum + " geldi gardaşım. (" + roll + ")");
        }
      }

      return;
    }
  }
  if (command === "kiss") {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Kendine birini seçmen gerekli canısı.");

    if (message.author.id === member.user.id)
      var title = `${message.author.username} kendi kendini öpüyor, hayırdır inş.`;
    else
      var title = `${message.author.username} :heart: ${member.user.username} ile öpüştü. Buralar karışıyor rez alın :relaxed:`;

    client.giphy.random(
      {
        tag: command,
        rating: "g",
        height: 200,
        limit: 1
      },
      function(err, res) {
        message.channel.sendMessage({
          embed: {
            title: title,
            image: {
              url: res.data.images.fixed_height.url
            },
            footer: {
              text: "Powered by GIPHY"
            }
          }
        });
      }
    );
  }
  if (command === "rulet") {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Kendine birini seçmen gerekli canısı.");

    if (message.author.id === member.user.id)
      var title = `${message.author.username} kendi kendini öpüyor, hayırdır inş.`;
    else
      var title = `${message.author.username} :kiss_mm: ${member.user.username} ile sexti :flushed:`;

    client.giphy.random(
      {
        tag: "sex",
        rating: "g",
        height: 200,
        limit: 1
      },
      function(err, res) {
        message.channel.sendMessage({
          embed: {
            title: title,
            image: {
              url: res.data.images.fixed_height.url
            },
            footer: {
              text: "Powered by GIPHY"
            }
          }
        });
      }
    );
  }
  if (command === "fuck") {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Kendine birini seçmen gerekli canısı.");

    if (message.author.id === member.user.id)
      var title = `${message.author.username} kendi kendini öpüyor, hayırdır inş.`;
    else
      var title = `${message.author.username} :kiss_mm: ${member.user.username} ile sexti :flushed:`;

    client.giphy.random(
      {
        tag: "sex",
        rating: "g",
        height: 200,
        limit: 1
      },
      function(err, res) {
        message.channel.sendMessage({
          embed: {
            title: title,
            image: {
              url: res.data.images.fixed_height.url
            },
            footer: {
              text: "Powered by GIPHY"
            }
          }
        });
      }
    );
  }
  if (command === "kill") {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Kendine birini seçmen gerekli canısı.");

    if (message.author.id === member.user.id)
      var title = `${message.author.username} intihar etti. Hemen 112'yi arayın :warning:`,
        keyword = "suicide";
    else
      var title = `${message.author.username} :knife: ${member.user.username}. Amann aman nerelere geldik :scream:`,
        keyword = "stabbing";
    console.log(keyword);
    client.giphy.search(
      {
        q: keyword,
        rating: "r",
        height: 200,
        limit: 50
      },
      function(err, res) {
        message.channel.sendMessage({
          embed: {
            title: title,
            image: {
              url: res.data[getRandomInt(50)].images.fixed_height.url
            },
            footer: {
              text: "Powered by GIPHY"
            }
          }
        });
      }
    );
  }
  if (command === "hug") {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Kendine birini seçmen gerekli canısı.");

    if (message.author.id === member.user.id)
      var title = `${message.author.username} intihar etti. Hemen 112'yi arayın :warning:`,
        keyword = "hug yourself";
    else
      var title = `${message.author.username} :hugging: ${member.user.username}. Çok tatlı dimiiii :heart:`,
        keyword = "hug";
    console.log(keyword);
    client.giphy.search(
      {
        q: keyword,
        rating: "g",
        height: 200,
        limit: 50
      },
      function(err, res) {
        message.channel.sendMessage({
          embed: {
            title: title,
            image: {
              url: res.data[getRandomInt(50)].images.fixed_height.url
            },
            footer: {
              text: "Powered by GIPHY"
            }
          }
        });
      }
    );
  }
  if (command === "iadd") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "u" + member.id;

    var value = args.join(" ").split("<");
    var value = value[0];

    var sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`;
    db.run(sql, [], function(err) {
      var sql = `INSERT INTO ${table} ('title') VALUES ('${value}')`;
      db.run(sql);
      return message.reply("ekledim cnm.");
    });
  }
  if (command === "ilist") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "u" + member.id;

    message.channel.send("```css\n Items```");

    var sql = `SELECT id, title FROM ${table}`;
    db.each(sql, [], function(err, rows) {
      //console.table(rows);
      message.channel.send("```" + rows.id + "- " + rows.title + "```");
    });
  }
  if (command === "idel") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "u" + member.id;

    var sql = `DELETE FROM ${table} WHERE id = ${args[0]}`;
    db.run(sql);
    return message.reply("sildim cnm.");
  }
  if (command === "eadd") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "e" + member.id;

    var value = args.join(" ").split("<");
    var value = value[0];

    var sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`;
    db.run(sql, [], function(err) {
      var sql = `INSERT INTO ${table} ('title') VALUES ('${value}')`;
      db.run(sql);
      return message.reply("ekledim cnm.");
    });
  }
  if (command === "elist") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "e" + member.id;

    message.channel.send("```css\n Equipments```");

    var sql = `SELECT id, title FROM ${table}`;
    db.each(sql, [], function(err, rows) {
      //console.table(rows);
      message.channel.send("```" + rows.id + "- " + rows.title + "```");
    });
  }
  if (command === "edel") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "e" + member.id;

    var sql = `DELETE FROM ${table} WHERE id = ${args[0]}`;
    db.run(sql);
    return message.reply("sildim cnm.");
  }
  
  if (command === "sadd") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "s" + member.id;

    var value = args.join(" ").split("<");
    var value = value[0];

    var sql = `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)`;
    db.run(sql, [], function(err) {
      var sql = `INSERT INTO ${table} ('title') VALUES ('${value}')`;
      db.run(sql);
      return message.reply("ekledim cnm.");
    });
  }
  if (command === "slist") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "s" + member.id;

    message.channel.send("```css\n Spells```");

    var sql = `SELECT id, title FROM ${table}`;
    db.each(sql, [], function(err, rows) {
      //console.table(rows);
      message.channel.send("```" + rows.id + "- " + rows.title + "```");
    });
  }
  if (command === "sdel") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "s" + member.id;

    var sql = `DELETE FROM ${table} WHERE id = ${args[0]}`;
    db.run(sql);
    return message.reply("sildim cnm.");
  }
  if (command === "madd") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    /*
        if(!member) {
          var member = message.author;
        } else {
          if (!message.member.roles.some(r => managers.includes(r.name)))
              return message.reply("çapın yetmez karşim!");
        } */

    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");

    let table = "money";
    let userid = member.id;
    let m = args[0];
    let type = args[1];

    var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
    db.all(sql, [], function(err, rows) {
      if (rows.length == 0) {
        var sql = `INSERT INTO ${table} ('userid', 'bakir', 'gumus', 'altin') VALUES ('${userid}', 0, 0, 0)`;
        db.run(sql);
      }
    });

    if (parseInt(m) <= 0) {
      message.reply("Yanlış değer");
      return false;
    }

    if (type == "bakır" || type == "gümüş") {
      var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
      db.each(sql, [], function(err, rows) {
        //console.log(rows); return false;
        var bakir = parseInt(rows.bakir);
        var gumus = parseInt(rows.gumus);
        var altin = parseInt(rows.altin);
        var money = parseInt(m);

        if (type == "bakır") {
          var newBakir = bakir + money;

          if (newBakir > 9) {
            var newGumus = parseInt(newBakir / 10);
            var newBakir = newBakir - newGumus * 10;

            var bakir = newBakir;

            var newGumus = gumus + newGumus;

            if (newGumus > 9) {
              var newAltin = parseInt(newGumus / 10);
              var newGumus = newGumus - newAltin * 10;
              var newAltin = altin + newAltin;

              var altin = newAltin;
            }

            var gumus = newGumus;

            var sql = `UPDATE ${table} SET 'bakir' = ${bakir}, 'gumus' = ${gumus}, 'altin' = ${altin} WHERE userid = ${userid}`;
            db.run(sql);
          } else {
            var sql = `UPDATE ${table} SET 'bakir' = bakir+${money} WHERE userid = ${userid}`;
            db.run(sql);
          }
        }

        if (type == "gümüş") {
          var newGumus = gumus + money;

          if (newGumus > 9) {
            var newAltin = parseInt(newGumus / 10);
            var newGumus = newGumus - newAltin * 10;
            var newAltin = altin + newAltin;

            var gumus = newGumus;
            var altin = newAltin;

            var sql = `UPDATE ${table} SET 'gumus' = ${gumus}, 'altin' = ${altin} WHERE userid = ${userid}`;
            db.run(sql);
          } else {
            var sql = `UPDATE ${table} SET 'gumus' = gumus+${money} WHERE userid = ${userid}`;
            db.run(sql);
          }
        }

        //console.table(rows);
        //message.channel.send('```json\n Wallet | Bakır: '+rows.bakir+', Gümüş: '+rows.gumus+', Altın: '+rows.altin+'```');
      });
    } else {
      var sql = `UPDATE ${table} SET 'altin' = altin+${m} WHERE userid = ${userid}`;
      db.run(sql);
    }
  }
  if (command === "mlist") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      var member = message.author;
    } else {
      if (!message.member.roles.some(r => managers.includes(r.name)))
        return message.reply("çapın yetmez karşim!");
    }

    let table = "money";
    let userid = member.id;

    var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
    db.all(sql, [], function(err, rows) {
      if (rows.length == 0) {
        var sql = `INSERT INTO ${table} ('userid', 'bakir', 'gumus', 'altin') VALUES ('${userid}', 0, 0, 0)`;
        db.run(sql);

        var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
        db.each(sql, [], function(err, rows) {
          //console.table(rows);
          message.channel.send(
            "```json\n Wallet | Bakır: " +
              rows.bakir +
              ", Gümüş: " +
              rows.gumus +
              ", Altın: " +
              rows.altin +
              "```"
          );
        });
      }
    });

    var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
    db.each(sql, [], function(err, rows) {
      //console.table(rows);
      message.channel.send(
        "```json\n Wallet | Bakır: " +
          rows.bakir +
          ", Gümüş: " +
          rows.gumus +
          ", Altın: " +
          rows.altin +
          "```"
      );
    });
  }
  if (command === "mdrop") {
    var member =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    /*
        if(!member) {
          var member = message.author;
        } else {
          if (!message.member.roles.some(r => managers.includes(r.name)))
              return message.reply("çapın yetmez karşim!");
        } */

    if (!message.member.roles.some(r => managers.includes(r.name)))
      return message.reply("çapın yetmez karşim!");

    let table = "money";
    let userid = member.id;
    let m = args[0];
    let type = args[1];

    var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
    db.all(sql, [], function(err, rows) {
      if (rows.length == 0) {
        var sql = `INSERT INTO ${table} ('userid', 'bakir', 'gumus', 'altin') VALUES ('${userid}', 0, 0, 0)`;
        db.run(sql);
      }
    });

    if (parseInt(m) <= 0) {
      message.reply("Yanlış değer");
      return false;
    }

    if (type == "bakır" || type == "gümüş") {
      var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
      db.each(sql, [], function(err, rows) {
        //console.log(rows); return false;
        var bakir = parseInt(rows.bakir);
        var gumus = parseInt(rows.gumus);
        var altin = parseInt(rows.altin);
        var money = parseInt(m);

        var allMoney = bakir + gumus * 10 + altin * 100;

        if (type == "bakır") {
          if (allMoney - money < 0) {
            message.reply("Yetersiz Bakiye");
            return false;
          }
        }

        if (type == "gümüş") {
          var money = money * 10;

          if (allMoney - money < 0) {
            message.reply("Yetersiz Bakiye");
            return false;
          }
        }

        var newMoney = allMoney - money;
        var newaltin = parseInt(newMoney / 100);
        var newgumus = parseInt((newMoney - newaltin * 100) / 10);
        var newbakir = parseInt(newMoney - newaltin * 100 - newgumus * 10);

        var sql = `UPDATE ${table} SET 'bakir' = ${newbakir}, 'gumus' = ${newgumus}, 'altin' = ${newaltin} WHERE userid = ${userid}`;
        db.run(sql);
      });
    } else {
      var sql = `SELECT * FROM ${table} WHERE userid = ${userid}`;
      db.each(sql, [], function(err, rows) {
        //console.log(rows); return false;
        var bakir = parseInt(rows.bakir);
        var gumus = parseInt(rows.gumus);
        var altin = parseInt(rows.altin);
        var money = parseInt(m);

        if (altin - money < 0) {
          message.reply("Yetersiz Bakiye");
          return false;
        } else {
          var sql = `UPDATE ${table} SET 'altin' = altin-${m} WHERE userid = ${userid}`;
          db.run(sql);
        }
      });
    }
  }
  /*
  if (command === "vol") {
    client.music.bot.volumeFunction(message, args[0]);
  }
  if (command === "stop") {
    client.music.bot.clearFunction(message, args[0]);
  }*/
});
/*
client.music.start(client, {
  // Set the api key used for YouTube.
  youtubeKey: config.youtube,
  botPrefix: config.prefix,
  defVolume: 10,

  // The PLAY command Object.
  play: {
    // Usage text for the help command.
    usage: config.prefix + "play some tunes",
    // Whether or not to exclude the command from the help command.
    exclude: false
  },

  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: "386152161953841183",

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: true
  }
});
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

client.login(config.token);
//client.destroy(config.token);
