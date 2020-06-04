const { MessageEmbed } = require("discord.js");
const Pokemon = require("../../../Lib/Database/Models/pokemon")
const PokeBlaze = require("../../../Lib/Base/Command");
class Pokemons extends PokeBlaze {
    constructor ( client ) {
        super ( client,{
            name : "info",
            description : "Shows the Info of the Pokemon of a User",
            usage : "b3info",
            category : "Main",
            cooldown : 1000,
            aliases : [ "poke","mons" ],
            permLevel : 1,
            permission : "READ-MESSAGES"
        } );
    }

    async run ( client,message,args ) {

        await Pokemon.find ( { userID : message.author.id } )
            .sort ( [ [ "IVTOTAL","descending" ] ] )
            .exec ( async ( err,res ) => {
                if ( err ) console.log ( err );
                if ( args[0] !== "latest" ) {
                    if ( args[0] < res.length ) {
                        let i = args[0];
                        const embed = new MessageEmbed ()
                            .setThumbnail ( message.author.displayAvatarURL ( { dynamic : true } ) )
                            .setTitle ( `${ message.author.tag }'s Pokemon list` )
                            .addField ( "Pokemon Name",`${ res[i].pokeName }`, true )
                            .addField ( "Pokemon Number",`${ res[i].pokeNumber }`, true )
                            .addField ( "Selected",`${ res[i].selected }`, true )
                            .addField ( "Health",`${ res[i].Health }/31`, true )
                            .addField ( "Attack",`${ res[i].Atk }/31`, true )
                            .addField ( "Defence",`${ res[i].Def }/31`, true )
                            .addField ( "Special Attack",`${ res[i].spAtk }/31`, true )
                            .addField ( "Special Defence",`${ res[i].SpDef }/31`, true )
                            .addField ( "Speed",`${ res[i].speed }/31`, true )
                            .addField ( "Total IV",`${ res[i].IVTOTAL }%`, true )

                        await message.channel.send ( { embed } )
                    } else {
                        return message.channel.send ( "Please give a pokemon number or latest as the arg" )
                    }
                } else {
                    if ( res.length === 0 ) return message.channel.send ( "You did not catch any pokemon. :(" )
                    console.log(res.length)
                    let i = res.length - 1;
                    const embed = new MessageEmbed ()
                        .setThumbnail ( message.author.displayAvatarURL ( { dynamic : true } ) )
                        .setTitle ( `${ message.author.tag }'s Pokemon list` )
                        .addField ( "Pokemon Name",`${ res[i].pokeName }` )
                        .addField ( "Pokemon Number",`${ res[i].pokeNumber }` )
                        .addField ( "Selected",`${ res[i].selected }` )
                        .addField ( "Health",`${ res[i].Health }/31` )
                        .addField ( "Attack",`${ res[i].Atk }/31` )
                        .addField ( "Defence",`${ res[i].Def }/31` )
                        .addField ( "Special Attack",`${ res[i].spAtk }/31` )
                        .addField ( "Special Defence",`${ res[i].SpDef }/31` )
                        .addField ( "Speed",`${ res[i].speed }/31` )
                        .addField ( "Total IV",`${ res[i].IVTOTAL }%` )
                        .setImage ( res[i].pokePic )
                    await message.channel.send ( { embed } )
                }
            } )
    }
}
module.exports = Pokemons;