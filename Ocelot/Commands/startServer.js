const Discord = require("discord.js");
const config = require('../config.json');
const mcping = require('mc-ping-updated');
const wol = require("node-wol");
const admins = require('../adminList.json');
const adminsArray = admins.list;

exports.run = async (Ocelot, msg, args) => {
    if(adminsArray.includes(msg.author.id)) {
        if(!args || args.size < 1) return msg.reply("Please enter a valid file name!")
        serverState(msg); 
        
    }else{
        msg.channel.send(`${msg.author} You are not permitted to run this command!`);
    }
};

function serverState(msg) {
    mcping(config.ip, config.port, function(err, res) {
        if(err) {
            console.error(err);
            msg.channel.send("Starting Server! This might take a while :)");
            console.log("sending Magic Packet! *POOF*")
            wolServer();
        } else {
            msg.channel.send("Server already online!");
        }
    });
};

function wolServer() {
    wol.wake(config.MAC, {
        address: config.server,
        port: 9
    }, function(err) {
        if(err) {
          console.log(err)
          return;
        }
    });
}

module.exports.help = {
  name: "startServer"
}