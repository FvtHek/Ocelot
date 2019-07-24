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
    Ocelot.user.setActivity("you sleep O_O *meow*", {type:'WATCHING'});
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

Ocelot.login(config.token);