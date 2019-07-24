const Discord = require("discord.js");
const config = require('../config.json');
const mcping = require("mc-ping-updated");

var playerArray = [];

module.exports.run = async (Ocelot, msg, args) => {
  mcping(config.ip, config.port, function(err, res) {
    if(err) {
      console.error(err);
      msg.channel.send('The server is currently offline');
    } else {
        if(res.players.sample) {
            i=0;
            res.players.sample.forEach(element => {
                playerArray.push(res.players.sample[i].name);
                i++
            });

            msg.channel.send('Players online: \n\n' + playerArray);
        } else {
            msg.channel.send('No players online.. :(')
        }
    }
  });
}

module.exports.help = {
  name: "list"
}