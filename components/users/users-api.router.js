module.exports = function(app) {
    app.route('/api/users')
        .get((req, res) => {
            res.json({
                name: {
                    first: 'Rodrigo',
                    last: 'Almeida'
                },
                msg: 'Simple json to be replaced with a database query'
            });
        });
}