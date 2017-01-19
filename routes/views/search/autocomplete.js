const keystone = require('keystone');
const PostCategory = keystone.list('PostCategory');

module.exports = (req, res, next) => {
    if (!req.query.search) {
        return res.send({
            data: [],
        });
    }

    PostCategory.model.find({
        name: new RegExp(req.query.search, 'i'),
        published: true,
    }, {
        name: 1,
        _id: 1,
        price: 1
    }, (err, results) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Internal Server Error',
            });
        }

        return res.status(200).send({
            data: results,
        });
    });
};
