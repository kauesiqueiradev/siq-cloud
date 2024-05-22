import express from 'express';
import bodyParser from 'body-parser';
import Mail from './../services/nodemailer';

const emailRouter = express.Router(); 
emailRouter.use(bodyParser.json());

emailRouter.route('/email').get((req, res) => {
    res.send({ 'result': 'version 0.0.2' })
});

emailRouter.route('/email-send').post((req, res) => {
    const message = req.body;
    
    Mail.to = message.to;
    Mail.subject = message.subject;
    Mail.message = message.message;

    let result = Mail.sendMail();

    res.status(200). json({ 'result': result })
});


export default emailRouter;