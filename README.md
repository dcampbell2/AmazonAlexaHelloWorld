# AmazonAlexaHelloWorld
Basic level skill for Amazon Alexa

You command Alexa to open the Skill "Artist Finder" she opens it with the opening line "Hello World! Say the name of an artist, try saying the name of an artist"

After saying the name of an artist she will then respond "Here is 'artist' top ablum 'album name'.

First and foremost as practice for my next skill, Alexa first ask's the user to authenticate themselves within the Alexa app using OAuth which the closest comparison is two step verification.

Within the Alexa App the user is given a "card" from the recent skill request. After clicking is prompted to login using there amazon alexa credentials.

In order for this skill to work I pulled all dependencies from Node.js using npm init --yes to first create a JSON package to be initialized within Lambda creating a new Lambda Function, Then using npm install request --save to bring in all Node.js dependencies and attach them within the living directory of the code.

Next, using params with respective keys and values and manually inserting them in Postman which then created the needed URL. The API used with this skill was Last.fm using my API key I received. That API is where Alexa pulls in the data relating to artist topalbums and lastly Alexa recognizes the Artist name thanks to Amazons database Artist.name within the Alexa Skill Builder on the developer console.

After all configuring of code and testing is done I then create a YML file and deploy using serverless with a simple command "serverless deploy" within my CLI.