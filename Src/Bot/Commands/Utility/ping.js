const PokemonCmd = require ( "../../../Lib/Base/Command" );

class Ping extends PokemonCmd {
    constructor (client) {
        super ( client,{
            name : "ping",
            description : "A Simple Command which shows the ping of the bot",
            category : "Utility",
            cooldown : 5000,
            usage : "b!ping",
            aliases : [ "pong" , "pingpong" ],
            permission : "READ_MESSAGES",
        });
    }
    async run ( client, message , args ) {
        const msg = await message.channel.send ( `🏓 Pinging....` );

        msg.edit ( `🏓 Pong!
        Latency is ${ Math.floor ( msg.createdTimestamp - message.createdTimestamp ) }ms
        API Latency is ${ Math.round ( client.ws.ping ) }ms` );
    }
}

module.exports = Ping;