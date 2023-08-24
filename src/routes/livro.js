const express = require("express");
const conectarBancoDados = require("../middlewares/conectarBD");
const EsquemaLivros = require("../models/livro");
const tratarErrosEsperados = require("../functions/tratarErros");
const router = express.Router();

router.post("/livros", conectarBancoDados, async function (req, res) {
  try {
    // # swagger.tags = ['Livros']
    let { id, titulo, num_paginas, isbn, editora } = req.body;

    const criarLivro = await EsquemaLivros.create({
      id,
      titulo,
      numeroDePaginas: num_paginas,
      ISBN: isbn,
      editora,
    });

    res.status(200).json({
      status: "ok",
      statusMensagem: "livro criado com sucesso",
      resposta: criarLivro,
    });
  } catch (error) {
    console.log(req.body);
    console.log(error);
    return tratarErrosEsperados(res, error);
  }
});

router.put("/livros/:id", conectarBancoDados, async function (req, res) {
  try {
    var idLivro = req.params.id;
    let { titulo, num_paginas, isbn, editora } = req.body;
    
    const checkLivro = await EsquemaLivros.findOne({ id: idLivro });
    if (!checkLivro) {
      throw new Error("Livro não encontrado ou não existe");
    }

    const LivroAtualizado = await EsquemaLivros.updateOne(
      { id: idLivro },
      { titulo, numeroDePaginas: num_paginas, ISBN: isbn, editora }
    );
    if (LivroAtualizado?.modifiedCount > 0) {
      const dadosLivro = await EsquemaLivros.findOne({ id: idLivro });

      res.status(200).json({
        status: "ok",
        statusMensagem: "Livro atualizado com sucesso !",
        resposta: dadosLivro,
      });
    }
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get("/livros", conectarBancoDados, async function (req, res) {
  try {
    const buscarLivro = await EsquemaLivros.find();

    res.status(200).json({
      resposta: buscarLivro,
    });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get("/livros/:id", conectarBancoDados, async function (req, res) {
  try {
    var idLivroBuscar = req.params.id;
    const livroRetornado = await EsquemaLivros.findOne({ id: idLivroBuscar });
    if (!livroRetornado) {
      throw new Error("Livro não encontrado");
    }
    res.status(200).json({
      resposta: livroRetornado,
    });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.delete("/livros/:id", conectarBancoDados, async function (req, res) {
  try {
    var idLivro = req.params.id;
    const deletarLivro = await EsquemaLivros.deleteOne({ id: idLivro });
    if (deletarLivro.deletedCount === 0) {
      throw new Error("Livro não encontrado ou id incorreto !");
    }
    res.status(200).json({
      status: "ok",
      statusMensagem: "Livro deletado com sucesso !",
      resposta: deletarLivro,
    });
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
