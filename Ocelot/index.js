const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const Ocelot = new Discord.Client({disableEveryone: true});
Ocelot.commands = new Discord.Collection();

fs.readdir("./Commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Some files in the command folder were not found! Try adding some");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./Commands/${f}`);
        console.log(`${f} loaded succesfully!`);
        Ocelot.commands.set(props.help.name, props);
    });
});

Ocelot.on("ready", async () => {
    console.log(`${Ocelot.user.username} is active! I am in ${Ocelot.guilds.size} Servers!`)
    Ocelot.user.setActivity("you sleep O_O *meow*", {type:'WATCHING'});
});

Ocelot.login(config.token);