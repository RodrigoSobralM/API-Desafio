const mongoose =  require('mongoose');
const tratarErros = require('../functions/tratarErros')

async function conectarBancoDados(req=null, res=null, next=null) {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Conectado ao Banco de Dados!')
        try { next(); } catch { };
        return mongoose;
    } catch (error) {
        console.error(error)
        tratarErros(res, 'Error: Erro ao conectar ao banco de dados')
        return error
    }
}

module.exports = conectarBancoDados