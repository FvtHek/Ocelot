module.exports.run = async (Ocelot, msg, args) => {
  Ocelot.usernames = [];
  Ocelot.on ("message", (msg) => {
    if (message.content.startsWith ("link")) {
      mcusername = message.content.slice (5);
      Ocelot.usernames [message.author.id] = {
        minecraftusername: mcusername
      }
      fs.writeFile ("Ocelot\Files\mcusernames.json", JSON.stringify (Ocelot.usernames, null, 4), err => {
        if (err) throw err;
        message.channel.send ("username for " + message.author.username + " saved");
      });
    }
});
}


module.exports.help = {
  name: "mcusernames"
}