const keystone = require('keystone');
const Contact = keystone.list('Contact');

module.exports = (req, res, next) => {
    const View = new keystone.View(req, res);
    const locals = res.locals;

    Contact.model.find({}, {
        _id: 0,
        __v: 0,
    }, (err, contactInfo) => {
        if (err) {
            locals.error = 'Internal Server Error';
            return View.render('error', locals);
        }

        contactInfo = contactInfo[0];

        locals.latitude = contactInfo.latitude;
        locals.longitude = contactInfo.longitude;
        locals.contactInfo = contactInfo.contactInfo;
        locals.section = 'contact';

        return View.render('contact', locals);
    });
};
