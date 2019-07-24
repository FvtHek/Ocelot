const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const Ocelot = new Discord.Client({disableEveryone: true});
Ocelot.commands = new Discord.Collection();
var mcping = require('mc-ping-updated');
var statustring = "No signal";
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = config.ip; // Your MC server IP
var mcPort = config.port; // Your MC server port

fs.readdir("./Commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Some files in the command folder were not found! Try adding some");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./Commands/${f}`);
        console.log(`${f} loaded succesfully!`);
        Ocelot.commands.set(props.help.name, props);
    });
});

Ocelot.on("ready", async () => {
    console.log(`${Ocelot.user.username} is active! I am in ${Ocelot.guilds.size} Server(s)!`)
    Ocelot.setInterval(update,300);
});

Ocelot.on("message", async message => {
    if(message.author.Ocelot) return;
    if(message.channel.type === "dm") return;

let prefix = "&";
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

let commandfile = Ocelot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(Ocelot,message,args);

});

function update() {
    /*seconds = seconds + 1;
    secondsString = seconds.toString();
    Ocelot.user.setActivity(secondsString, { type: 'Playing' })
    .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);*/
  
      mcping(mcIP, mcPort, function(err, res) {
        if(err) {
            console.log(err);
            //return message.reply('Error getting Minecraft server status...');
        }
        body = JSON.parse(res);
        var status = 'Server offline';
        console.log(body.description.text);
        if(body.online) {
            if((body.description.text=="&cWe are under maintenance.")||(body.players.now>=body.players.max)){
              Ocelot.user.setStatus('idle')
              //.then(console.log)
              .catch(console.error);
            }else{
              Ocelot.user.setStatus('online')
              //.then(console.log)
              .catch(console.error);
            }
              if(body.players.now) {
                  status = ' ' + body.players.online + '  of  ' + body.players.max;
                } else {
                  status = ' 0  of  ' + body.players.max;
          }
        } 

    Ocelot.user.setActivity(status, { type: 'PLAYING' })
    .then(presence => console.log(status))
    .catch(console.error);
    });
  
  }

Ocelot.login(config.token);