console.log('Bot is starting');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config)

var params = {
  q: 'lvl 60 leviathan',
  count: 20
}

T.get('search/tweets', params, gotData);


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
