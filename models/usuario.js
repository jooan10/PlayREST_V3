const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
});


let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;