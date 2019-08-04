const admins = require('../adminList.json');
const adminsArray = admins.list;

exports.run = async (Ocelot, msg, args) => {

    if(!adminsArray.includes(msg.author.id)) {
        msg.channel.send(`${msg.author} You are not permitted to run this command!`);
    }else{
        if(!args || args.size < 1) return msg.reply("Please enter a valid file name!")
        msg.channel.send('Test Succesful')
        console.log("test succesful");
    }
};

module.exports.help = {
    name: "test"
}