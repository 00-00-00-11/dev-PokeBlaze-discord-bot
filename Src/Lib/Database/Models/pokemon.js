const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
    userID: { type: String },
    username: { type: String },
    pokeName: { type: String },
    pokePic: { type: String },
    pokeNumber: { type: Number },
    selected: { type: Boolean, default: false },
    Health: { type: Number },
    spAtk: { type: Number },
    SpDef: { type: Number },
    Def: { type: Number },
    Atk: { type: Number },
    speed: { type: Number },
    IVTOTAL: { type: Number }
});

module.exports = mongoose.model("Pokemons", pokemonSchema);