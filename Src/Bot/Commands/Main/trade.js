const PokeCmd = require("../../../Lib/Base/Command");
const Pokemon = require("../../../Lib/Database/Models/pokemon.js")
const { MessageEmbed, MessageCollector } = require("discord.js");

class Trade extends PokeCmd {
    constructor (client) {
        super (client,{
            name: "trade",
            description: "Trades with a user",
            cooldown: 5000,
            usage: "b!trade",
            aliases: ["t"]
        });
    }
    async run (client, message, args) {

        const user = message.author;
        const user2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user2) return message.channel.send("That isn't a valid user!");

        await message.channel.send(`What pokemon would you like to trade with ${user2}?`);

        const filter1 = m => m.author.id === user.id;
        const collector = await message.channel.awaitMessages(filter1, { max: 1, time: 30000 });

        if (!collector.first()) return message.channel.send("no response received! Cancelling the trade...");

        const trade1 = collector.first().content.charAt(0).toUpperCase() + collector.first().content.slice(1);

        const pokemon = await Pokemon.findOne({ userID: user.id, pokeName: trade1 });
        
        if (!pokemon) return message.channel.send("I was unable to find that pokemon! Cancelling the trade...");

        await message.channel.send(`${user2}! What pokemon would you like to trade for a ${trade1} from ${user}?`);

        const filter2 = m => m.author.id === user2.id;
        const collector2 = await message.channel.awaitMessages(filter2, { max: 1, time: 30000 });

        if (!collector2.first()) return message.channel.send("No response was received! Cancelling the trade...");

        const trade2 = collector2.first().content.charAt(0).toUpperCase() + collector2.first().content.slice(1);

        const pokemon2 = await Pokemon.findOne({ userID: user2.id, pokeName: trade2 });

        if (!pokemon2) return message.channel.send("I was unable to find that pokemon! Cancelling the trade...");

        const tradeEmbed = new MessageEmbed()
        .setTitle(`Trade between ${user.username} and ${user2.user.username}`)
        .setDescription(`Remember that we can't do anything if you are scammed, as it is your responsibility to confirm the details of the trade. Please confirm that all these details are correct. If they are valid, type \`CONFIRM\` to confirm and finish the trade, else type \`CANCEL\` to cancel the trade.`)
        .addField(user.username + " will receive:", `${pokemon2.pokeName}/31\nStats:\nHealth: ${pokemon2.Health}/31\nSpecial Attack: ${pokemon2.spAtk}/31\nSpecial Defence: ${pokemon2.SpDef}/31\nDef: ${pokemon2.Def}/31\nAtk: ${pokemon2.Atk}/31\nSpeed: ${pokemon2.speed}/31\nTotal IV: ${pokemon2.IVTOTAL}%`)
        .addField(user2.user.username + " will receive:", `${pokemon.pokeName}/31\nStats:\nHealth: ${pokemon.Health}/31\nSpecial Attack: ${pokemon.spAtk}/31\nSpecial Defence: ${pokemon.SpDef}/31\nDef: ${pokemon.Def}/31\nAtk: ${pokemon.Atk}/31\nSpeed: ${pokemon.speed}/31\nTotal IV: ${pokemon.IVTOTAL}%`)
        .setColor("RED");
        
        await message.channel.send(tradeEmbed);

        const confirmFilter = m => [user.id, user2.id].includes(m.author.id);
        const confirmation = message.channel.createMessageCollector(confirmFilter, { time: 30000 });
        const map = new Map();

        confirmation.on("collect", async m => {

            if (m.content.toLowerCase() === "confirm") {

                if (map.has(m.author.id)) return message.channel.send("Hey! You have already confirmed! Please wait for the other person to also confirm the trade!");

                map.set(m.author.id, true);

                message.channel.send(`${m.author} has confirmed the trade!`);

                if (map.has(user.id) && map.has(user2.id)) {

                    await confirmation.stop();
                
                    pokemon2.userID = user.id;
                    pokemon2.selected = false;
                    pokemon.userID = user2.id;
                    pokemon.selected = false;

                    await pokemon2.save().catch(err => console.log(err));
                    await pokemon.save().catch(err => console.log(err));
                    return message.channel.send(`Trade successfully completed! ${user} received a ${trade2}, while ${user2} recieved a ${trade1}!`);
                };
            } else if (m.content.toLowerCase() === "cancel") {

                await confirmation.stop();

                return message.channel.send("Cancelling trade...");
            } else {
                return message.channel.send("What? That isn't a valid choice!");
            };
        });

    };
}
module.exports = Trade;