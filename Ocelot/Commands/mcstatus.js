exports.run = async (Ocelot, msg, args) => {
function update() {
  /*seconds = seconds + 1;
  secondsString = seconds.toString();
  Ocelot.user.setActivity(secondsString, { type: 'Playing' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);*/

    mcping(mcIP, mcPort, function(err, res, body) {
      if(err) {
          console.log(err);
          //return message.reply('Error getting Minecraft server status...');
      }
      body = JSON.parse(body);
      var status = 'Server offline';
      console.log(body.motd);
      if(body.online) {
          if((body.motd=="&cWe are under maintenance.")||(body.players.now>=body.players.max)){
            Ocelot.user.setStatus('idle')
            //.then(console.log)
            .catch(console.error);
          }else{
            Ocelot.user.setStatus('online')
            //.then(console.log)
            .catch(console.error);
          }
            if(body.players.now) {
                status = ' ' + body.players.now + '  of  ' + body.players.max;
              } else {
                status = ' 0  of  ' + body.players.max;
        }
      } else {
        Ocelot.user.setStatus('dnd')
        //.then(console.log)
        .catch(console.error);

      }
      Ocelot.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  });

}
Ocelot.on("ready", () => {
  console.log("I am ready!");
  Ocelot.setInterval(update,300);
});

}
module.exports.help = {
    name: "mcstatus"
}
