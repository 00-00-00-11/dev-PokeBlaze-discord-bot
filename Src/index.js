const Pokemon = require ( "./Lib/Base/Pokemon.js" );
const PokeBlaze = new Pokemon ({config : "../config" });
PokeBlaze.login (PokeBlaze.config.token);
PokeBlaze.loadCommands();
PokeBlaze.loadEvents();