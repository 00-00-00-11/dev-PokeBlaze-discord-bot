const PokeCmd = require("../../../Lib/Base/Command");
const PlayerInfo = require("../../../Lib/Database/Models/playerinfo")
const Pokemon = require("../../../Lib/Database/Models/pokemon");
const { MessageCollector, MessageEmbed } = require("discord.js");
const Pokemons = require("../../../Lib/AllPokemons/pokes.json");
let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;
class Start extends PokeCmd {
    constructor (client) {
        super (client,{
            name: "start",
            description: "Chooses A Starter Pokemon",
            cooldown: 5000,
            usage: "b!start",
            aliases: ["s", "stpoke"]
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
        "Gen 1: Bulbasaur, Charmander, Squirtle\n" +
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
        let health = Math.floor ( Math.random () * 31 );
        let spatk = Math.floor ( Math.random () * 31 );
        let atk = Math.floor ( Math.random () * 31 );
        let def = Math.floor ( Math.random () * 31 );
        let spd = Math.floor ( Math.random () * 31 );
        let spdef = Math.floor ( Math.random () * 31 );
        let iv = Math.floor ( Math.ceil(atk + health + spatk + spdef + def + spd) / (31 * 6) *100 );
        let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
        collector.on('collect', async msg => {
            if (["Bulbasaur", "Charmander", "Squirtle", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip", "Turtwig", "Chimchar", "Piplup", "Snivy", "Tepig", "Oshawott", "Chespin", "Fennekin", "Froakie", "Rowlet", "Litten", "Popplio", "Grookey", "Scorbunny", "Sobble"].includes(msg.content) ) {
            if ( !starterchoosen ) {
                if(msg.content === "") {

                } else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }
                else
                if(msg.content === "") {

                }

                let disabled;

                for (let retards in Pokemons) {

                    if (Pokemons[retards].Name === msg.content) {
                        disabled = Pokemons[retards];
                        disabled.pokenum = Number(retards);
                    };
                };

                await PlayerInfo.findOne ( { userID : msg.author.id } , async ( err , startername , starterchoosen, numberofpokes ) => {
                    if ( err ) console.log ( err );
                    if ( !startername || !starterchoosen || !numberofpokes) {
                        const newPlayerInfo = new PlayerInfo ( {
                            userName : msg.author.username ,
                            userID : msg.author.id ,
                            startername : msg.content ,
                            starterchoosen : true ,
                            coins: 0,
                            numberofpokes: 1
                        } );
                        newPlayerInfo.save ().catch ( err => console.log ( err ) );
                    }
                } );
                await Pokemon.findOne ( { userID : msg.author.id },async ( err,pokeName,pokeNumber,selected,pokePic,Health,spAtk,SpDef,Def,Atk,speed,IVTOTAL,xp,level ) => {
                    if ( err ) console.log ( err );
                    if ( !pokeName || !pokePic || !pokeNumber || !selected || !xp || !level || !Health || !spAtk || !SpDef || Def || !Atk || !speed || IVTOTAL ) {
                        const newPokemon = new Pokemon ( {
                            userName : msg.author.username,
                            userID : msg.author.id,
                            pokeName : disabled.Name,
                            pokePic : disabled.Pic,
                            globalpokenum: disabled.pokenum,
                            xp: 0,
                            level: 0,
                            pokeNumber : 1,
                            selected: true,
                            Health : health,
                            spAtk : spatk,
                            SpDef : spdef,
                            Def : def,
                            Atk : atk,
                            speed : spd,
                            IVTOTAL : iv,
                        } );
                        await newPokemon.save ().catch ( err => console.log ( err ) );
                    }
                } );
                collector.stop ( 'A pokemon was choosen' );
                message.channel.send ( "You have chose **__" + msg.content + "__** as a starter pokemon" )

            } else {
                return message.channel.send ( `You already chose a starter pokemon named ` + startername + `. You cannot choose twice...` )
                    .then ( collector.stop ( 'A pokemon was already choosen' ) );
            }
            } else {
                return message.channel.send("Wrong Spelling or is not a Starter Pokemon");
            }
        })
    }
}
module.exports = Start;