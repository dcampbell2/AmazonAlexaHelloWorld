var Alexa = require('alexa-sdk');
var request = require('request');
var amznProfileURL = 'https://api.amazon.com/user/profile/?access_token=';

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);

  if (event.session.user.accessToken == undefined) {

    alexa.emit(':tellWithLinkAccountCard', 'to start using this skill, please use the companion app to authenticate on Amazon');
      return;

  }
  // alexa.APP_ID = 'amzn1.ask.skill.458a4a08-6764-4e37-9363-6d054ac4e645';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask','Hello world!  Say the name of an artist.', 'Try saying the name of an artist');
  },

  'ArtistName': function() {
    var artistName = this.event.request.intent.slots.artist.value;
    
    //set up variables used in the API request
    var artist = artistName;
    var api_key = 'f4dabb27c1b8d381f341d7af66f1b603';

    //generate the url
    var endpoint = 'http://ws.audioscrobbler.com/2.0?method=artist.gettopalbums&artist=' +
                    artist +'&api_key='+api_key+'&format=json';

    //we're issuing a GET request here, so we use the get method in the request object
    request.get(endpoint, (error, response, body) => {
        if(response.statusCode !== 200){
            this.emit(':tell', 'Sorry, I could not find that artist.');
        }else{
            //parse the data into a JSON object
            data = JSON.parse(body);
            console.log(body);
            //notice the two different ways we can access JSON objects below
            artist = data["topalbums"]["@attr"]["artist"];
            topalbums = data.topalbums.album;
            //lets sort by playcount
            topalbums.sort((a,b) => {
                return parseFloat(b.playcount) - parseFloat(a.playcount);
            })
            //loop through each album and display just the name and the play count
            this.emit(':tell', 'Here is ' + artistName + ' \'s top album, ' + topalbums[0].name); 
        }
    });
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye.`);
  },
  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent' : function () {
    this.emit(':ask', `You can tell me the name of a musical artist and I will say it back to you.  Who would you like me to find?`,  `Who would you like me to find?`);
  },
  'Unhandled' : function () {
    this.emit(':ask', `You can tell me the name of a musical artist and I will say it back to you.  Who would you like me to find?`,  `Who would you like me to find?`);
  }

};