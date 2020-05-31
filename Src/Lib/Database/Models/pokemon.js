const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
    userID: { type: String },
    username: { type: String },
    health: { type: Number },
    spatk: { type: Number },
    SpDef: { type: Number },
    Def: { type: Number },
    Atk: { type: Number },
    speed: { type: Number },
    IVTOTAL: { type: Number }
});

module.exports = mongoose.model("Pokemons", pokemonSchema);