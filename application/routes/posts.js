const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const db = require('../conf/database');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    }
})

const upload = multer({storage: storage});

router.post('/create', upload.single('uploadImage'), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.desc;
    let fk_userId = req.session.userId;

    sharp(fileUploaded)
        .resize(200)
        .toFile(destinationOfThumbnail)
        .then(() => {
            let baseSQL = 'INSERT INTO posts (title, description, photo, thumbnail, fk_authorId) VALUES (?,?,?,?,?);';
            
            return db.query(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userId])
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                req.flash('success', 'Post was created!');

                req.session.save((err) => {
                    if (err) {
                        next(err);
                    }
                    
                    res.redirect(`/`);
                });
            }
            else {
                req.flash('error', 'Failed to create post');
                req.session.save((err) => {
                    if (err) {
                        next(err);
                    }
                    
                    res.redirect(`/post`);
                });
            }
        });
});

router.get('/:id(\\d+)', (req, res, next) => {
    let postId = req.params.id;
    let baseSQL = 'SELECT p.title, p.description, p.photo, p.createdAt, u.username FROM posts p JOIN users u ON p.fk_authorId=u.id WHERE p.id=?;';

    db.query(baseSQL, [postId])
    .then(([results, fields]) => {
        if (results && results.length) {
            res.locals.currentPost = results[0];
            res.render('viewpost');
        }
        else {
            req.flash('error', 'No post found!');
            req.session.save((err) => {
                if (err) {
                    next(err);
                }
                
                res.redirect('/');
            });
        }
    })
});

router.get('/search', (req, res, next) => {
    let searchTerm = `%${req.query.searchText}%`;
    let baseSQL = 'SELECT id, title, description, thumbnail, CONCAT(" ", title, description) AS haystack FROM posts HAVING haystack like ?;'

    db.query(baseSQL, [searchTerm])
    .then(([results, fields]) => {

        res.locals.results = results;
        req.flash('info', `${results.length} results found`);
        req.session.save((err) => {
            if (err) {
                next(err);
            }

            res.render('index');
        });
    })
    .catch((err) => {
        next(err)
    })
});

module.exports = router;