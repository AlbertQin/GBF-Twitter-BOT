console.log('Bot is starting');

var Twit = require('twit');
var Discord = require("discord.js");


//DISCORD BOT
var bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "!";
  let messageArr = message.content.split(" ");
  let command = messageArr[0];
  let args = messageArr.slice(1);

  if(command === `${prefix}raid` && args === 0){
     return message.channel.send("dis aint valid");
  }


  if(command === `${prefix}raid`){
    var query = `lvl ${args[0]} ${args[1]}`;
    var T = new Twit({
      consumer_key: process.env.consumer_key,
      consumer_secret: process.env.consumer_secret,
      access_token: process.env.access_token,
      access_token_secret: process.env.access_token_secret,
    })

    var params = {
      q: query,
      count: 15
    }

    T.get('search/tweets', params, function(err, data, response){
      var finalString = "Raids:\n";
      var tweets = data.statuses;

      for (var i = 0; i < tweets.length; i++) {
        var spt = tweets[i].text.split("\n");
        finalString = finalString.concat(`${spt[0]}\n `);
        finalString = finalString.concat(`${spt[2]}\n `);

        var time = tweets[i].created_at;
        var ptime = time.split(" ");
        var t_time = ptime[3].split(":");

        console.log(t_time[0]);

        if(parseInt(t_time[0],10) - 5 < 0){
          finalString = finalString.concat(`${ptime[1]} ${parseInt(ptime[2]) - 1} ${(parseInt(t_time[0]) - 5) + 24 }:${parseInt(t_time[1])}:${parseInt(t_time[2])}\n `);
        } else {
          finalString = finalString.concat(`${ptime[1]} ${parseInt(ptime[2])} ${(parseInt(t_time[0]) - 5) % 24 }:${parseInt(t_time[1])}:${parseInt(t_time[2])}\n `);
        }
        finalString = finalString.concat("\n");
      }
      return message.channel.send(finalString);
    });

  }
})

bot.login(process.env.BOT_CONFIG);

//TWITTER API
