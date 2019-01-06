console.log('Bot is starting');

var Twit = require('twit');
var config = require('./config');
var botconfig = require("./botconfig.json");
var Discord = require("discord.js");


//DISCORD BOT
var bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArr = message.content.split(" ");
  let command = messageArr[0];
  let args = messageArr.slice(1);


  if(command === `${prefix}raid`){
    var query = `lvl ${args[0]} ${args[1]}`;
    var T = new Twit(config)

    var params = {
      q: query,
      count: 20
    }
    var finalString = "Raids:\n gdi";
    T.get('search/tweets', params, function(err, data, response){
      var tweets = data.statuses;

      for (var i = 0; i < tweets.length; i++) {
        var spt = tweets[i].text.split("\n");
        finalString = finalString.concat(`${spt[0]}\n `);
        finalString = finalString.concat(`${spt[1]}\n `);
        finalString = finalString.concat(`${tweets[i].created_at}\n `);
        finalString = finalString.concat("");
      }
    });

    return message.channel.send(finalString);
  }
})

bot.login(botconfig.token);

//TWITTER API
