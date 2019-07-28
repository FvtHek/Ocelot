module.exports.run = async (Ocelot, msg, args) => {
  if (msg.content.startsWith ("link")) {
    username = msg.content.slice (5);
    Ocelot.usernames [msg.author.id] = {
      mcusername: msg.content
    }
    false.writeFile ("./Files/mcusernames.json", JSON.stringify (Ocelot.usernames, null, 4), err => {
      if (err) throw err;
      msg.channel.send ("username for " + msg.author.username + "saved")
    });
  }
}


module.exports.help = {
  name: "mcusernames"
}