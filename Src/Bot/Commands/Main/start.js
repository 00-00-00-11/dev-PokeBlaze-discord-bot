const PokeCmd = require("../../../Lib/Base/Command");
const PlayerInfo = require("../../../Lib/Database/Models/playerinfo")
const { MessageCollector, MessageEmbed } = require("discord.js");
let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;
class Start extends PokeCmd {
    constructor (client) {
        super (client,{
            name: "start",
            description: "Chooses A Starter Pokemon",
            cooldown: 5000,
            usage: "b!start",
            aliases: ["starter", "stpoke"]
        });
    }
    async run (client, message, args) {
        const starterSettings = await PlayerInfo.findOne({userID: message.author.id}) || new PlayerInfo({
            userID: message.author.id
        });
        const { starterchoosen, startername } = starterSettings;
        let stembed;
        stembed = new MessageEmbed ()
            .setAuthor ( "PokeBlaze" )
            .setDescription ( "Please choose a starter Pokemon :)\n" +
                "\n"+
        "Gen 1: Bulbasur, Charmander, Squirtle\n" +
        "\n" +
        "Gen 2: Chikorita, Cyndaquil, Totodile\n" +
        "\n" +
        "Gen 3: Treecko, Torchic, Mudkip\n" +
        "\n" +
        "Gen 4: Turtwig, Chimchar, Piplup\n" +
        "\n" +
        "Gen 5: Snivy, Tepig, Oshawott\n" +
        "\n" +
        "Gen 6: Chespin, Fennekin, Froakie\n" +
        "\n" +
        "Gen 7: Rowlet, Litten, Popplio\n"+
        "\n"+
        "Gen 8: Grookey, Scorbunny, Sobble")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setImage("https://cdn.discordapp.com/attachments/712608509048651816/716547259604664320/Pokemon_starters_.png")
            .setFooter("You have 30 seconds of time to reply the correct name of pokemon")
        message.reply(stembed)
        let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
        collector.on('collect', async msg => {
            if ( !starterchoosen ) {

                console.log ( msg.content )
                await PlayerInfo.findOne ( { userID : message.author.id } , async ( err , startername , starterchoosen, numberofpokes ) => {
                    if ( err ) console.log ( err );
                    if ( !startername || !starterchoosen || !numberofpokes) {
                        const newPlayerInfo = new PlayerInfo ( {
                            userName : message.author.username ,
                            userID : message.author.id ,
                            startername : msg.content ,
                            starterchoosen : true ,
                            numberofpokes: 1
                        } );
                        newPlayerInfo.save ().catch ( err => console.log ( err ) );
                    }
                } );
                collector.stop ( 'A pokemon was choosen' );
                message.channel.send ( "You have chose **__" + msg.content + "__** as a starter pokemon" )
                return;
            } else {
                return message.channel.send ( `You already chose a starter pokemon named ` + startername + `. You cannot choose twice...` )
                    .then ( collector.stop ( 'A pokemon was already choosen' ) );
            }
        })
    }
}
module.exports = Start;