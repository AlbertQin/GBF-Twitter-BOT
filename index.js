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
    return message.channel.send("memes");
  }
})

bot.login(botconfig.token);

var T = new Twit(config)

var params = {
  q: 'lvl 60 leviathan',
  count: 20
}

T.get('search/tweets', params, gotData);

//TWITTER API
function gotData(err, data, response){
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    var spt = tweets[i].text.split("\n");
      console.log(spt[0]);
      console.log(spt[2]);

    console.log(tweets[i].created_at);
    console.log();
  }
}
