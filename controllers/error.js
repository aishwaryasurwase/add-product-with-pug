
class ErroController {
    constructor() { }
    pageNotFound(req, res) {
        res.render('page-not-found', { docTitle: 'Page not found', path: '/page-not-found' });
    }
}

module.exports = new ErroController();