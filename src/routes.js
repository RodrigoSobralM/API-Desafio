const routes = (app) => {
    app.use('', require('./routes/livro.js'))
    return;
}

module.exports = routes