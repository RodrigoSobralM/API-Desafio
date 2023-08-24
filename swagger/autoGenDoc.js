const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaLivros = require('../src/models/livro.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

let outputFile = './swagger_output.json';
let endpointsFiles = ['../index.js', '../src/routes.js'];


let doc = {
    info: {
        version: "1.0.0",
        title: "API do desafio",
        description: "Documentação da API do desafio."
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Servidor localhost."
        },
        {
            url: "https://APIDesafio.app/",
            description: "Servidor de produção."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            Livro: mongooseToSwagger(EsquemaLivros)
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
    if (process.env.NODE_ENV !== 'production') {
        require("../index.js");
    }
})