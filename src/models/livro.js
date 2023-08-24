const mongoose = require("mongoose");

const esquema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: "é obrigatorio!",
    },
    titulo: {
      type: String,
      unique: true,
      required: "é obrigatório!",
    },
    numeroDePaginas: {
      type: Number,
      required: "é obrigatório!",
    },
    ISBN: {
      type: Number,
      required: "é obrigatório!",
    },
    editora: {
      type: String,
      required: "é obrigatório!",
    },
  },
  {
    timestamps: true,
  }
);

const EsquemaLivros = mongoose.models.Livros || mongoose.model("Livros", esquema); 
  module.exports = EsquemaLivros;
