const fs = require('fs');
module.exports.run = async (Ocelot, message, args) => {
  console.log("lol");
  let usernames = JSON.parse(fs.readFileSync("./files/mcusernames.json", "utf8"));
      if (message.content.startsWith ("&link")) {
        mcusername = message.content.slice (6);
        usernames [message.author.id] = {
          minecraftusername: mcusername
        };
        let json = JSON.stringify(usernames)
        fs.writeFile ("./Files/mcusernames.json", json, (err) => {
          if (err) throw err;
          message.channel.send ("username for " + message.author.username + " saved");
          message.channel.send (json);
        });
      };
}


module.exports.help = {
  name: "link"
}