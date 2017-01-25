const nodemailer = require('nodemailer');
const jade = require('jade');
const fs = require('fs');

const transporter = nodemailer.createTransport('smtps://hitbodies%40gmail.com:hitbodiestesting@smtp.gmail.com');
const mailSender = 'hitbodies@gmail.com';

module.exports.getTemplate = (templateName, params, cb) => {
    if (!templateName && params && cb) {
        return cb('Missing required parameter in getTemplate()');
    }

    var html;

    fs.readFile(process.env.PWD + '/templates/mail/' + templateName + '.jade', 'utf8', (err, jadeFile) => {
        if (err) {
            return cb(err);
        }
        html = jade.compile(jadeFile)(params);
        return cb(null, html);
    });
};

module.exports.transporter = transporter;
module.exports.sendMail = transporter.sendMail;
module.exports.mailSender = mailSender;
