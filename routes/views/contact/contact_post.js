const mailer = require('../../../helpers/mailer');

module.exports = (req, res, next) => {
    const contactInfo = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        messageContent: req.body.messageContent,
    };

    mailer.getTemplate('contact', contactInfo, (err, html) => {
        if (err) {
            return res.status(500).send({
                message: 'Internal Server Error',
                status: 500,
                success: false,
                err
            });
        }

        mailer.transporter.sendMail({
            html,
            from: mailer.mailSender,
            to: 'argvil19@gmail.com',
            subject: `HIT-Bodies - ${contactInfo.name} sent you a message`,
            text: 'asd',
        }, (err, info) => {
            if (err) {
                return res.status(500).send({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false,
                    err
                });
            }

            return res.status(200).send({
                message: 'Email sent. We will respond as soon as we can.',
                status: 200,
                success: true,
            });
        });
    });
};
