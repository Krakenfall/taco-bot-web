# taco-bot-web
Taco-bot-web is the node.js-based frontend for the taco-bot-commands GroupMe bot. Taco-bot-web provides a view of the commands made available my the taco-bot-commands service and accompanying MongoDB. 

# Taco-bot Layout
Taco Bot is actually made of several pieces:
  * Api for reading commands in chat and replying with response from a MongoDB (taco-bot-commands)
  * A monitor node.js server that pushes reddit (and soon Twitter) posts to chat (taco-bot-news)
  * A web server for displaying taco-bot commands and clan information and links (taco-bot-web)

Taco-Bot uses the  GroupMe Bot system. GroupMe bots are created using the [GroupMe Developers site](https://dev.groupme.com/) and provide the ability to read or post in a chat using the GroupMe API.

Taco-Bot-Commands uses the express.js module to provide an API service. From the GroupMe API, it receives an HTTP POST each time someone comments in the chat. Using this POST, the server can process for commands or perform other functions.

Taco-Bot-News queries the Reddit API for new posts by /u/DTG_Bot and relays their links to a specified GroupMe chat. It also updates to the commands in the server for weeklyreset, xur and trialsinfo. These commands provide weekly-changed links to the Reddit megathreads for those activities. A twitter API query function is planned for future implementation.

Taco-Bot-Web uses the taco-bot-commands api to display available commands and provide relevant links for the DeltaCo71 clan.

# Getting taco-bot-web Running
1. [Setup an instance of taco-bot-commands](https://github.com/Krakenfall/taco-bot-commands).
2. Install Node.js on the computer where the app will run
3. Open a shell session at the directory where the app files are and run `npm install.` The necessary modules will be installed from the package.json file
4. Create a config.json file next to the server.js file. Use this format:
```javascript
{
 "domain": "[domain or public IP address for the computer where your app is running]",
 "port": "[desired, unused port]"
}
```
6. Set the taco-bot-commands api call url in the index.html. Currently, the line in question is line 167 in the ajax jsonp call for the "Populate Command List" script block.
```javascript
'url': 'http://[your publically available domain]:[taco-bot-commands port]/commands',
'type': 'GET',
'dataType': 'jsonp',
```
7. In your router, forward the port for taco-bot-web to the IP address specified in the appconfig for domain
8. Run the command `node server.js`
9. Visit your chosen url:port for taco-bot-web and you're good to go!
