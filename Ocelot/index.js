const config = require('./config.json');
const token = require('./token.json');
var mcping = require('mc-ping-updated');
const Discord = require('discord.js');
const fs = require('fs');
const Ocelot = new Discord.Client({disableEveryone: true});
Ocelot.commands = new Discord.Collection();

var statustring = "No signal";
var mcCommand = '/minecraft'; // Command for triggering

Ocelot.login(token.token);

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
    update();
    Ocelot.setInterval(update,30000);
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
    var status = '';

    mcping(config.ip, config.port, function(err, res) {
        if(err) {
            console.log('The server is currently offline.. :(')
            status = 'Server offline..'
            Ocelot.user.setPresence({ game: { name: status }, status: 'dnd' });
            //return message.reply('Error getting Minecraft server status...');

        } else {
            console.log(res);
            console.log(JSON.stringify(res.description.text));

            if((res.description.text === 'We are under maintenance.')){
                status = "Under Maintenance..";
                Ocelot.user.setPresence({ game: { name: status }, status: 'idle' });
                
                // Ocelot.user.setStatus('idle')
                
            } else {
                Ocelot.user.setStatus('online')
                status = ' ' + res.players.online + '  of  ' + res.players.max + " online";
                Ocelot.user.setActivity(status, { type: 'PLAYING' })
                .then(presence => console.log(status))
                .catch(console.error);
            }
        }

        
    });
}

