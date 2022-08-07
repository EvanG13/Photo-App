const postMiddleware = {};
const db = require('../conf/database');

postMiddleware.getRecentPosts = (req, res, next) => {
    db.query('SELECT id, title, description, thumbnail FROM posts;')
    .then(([results, fields]) => {
        if (results && results.length) {
            res.locals.results = results;
        }

        next();
    });
}

module.exports = postMiddleware;