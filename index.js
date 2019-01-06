console.log('Bot is starting');

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config)

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
})
