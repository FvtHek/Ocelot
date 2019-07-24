const Discord = require("discord.js");
const config = require('../config.json');
const mcping = require("mc-ping-updated");

module.exports.run = async (Ocelot, msg, args) => {
  mcping(config.ip, config.port, function(err, res) {
    if(err) {
      console.error(err);
    } else {
      msg.channel.send("```json" + JSON.stringify(res) + "```");
      console.log(res);
    }
  });
}

module.exports.help = {
  name: "mcstatus"
}