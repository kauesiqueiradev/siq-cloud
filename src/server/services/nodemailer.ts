import nodemailer from "nodemailer";
import config from "../config/config";

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string,
    ) {}

    async sendMail() {

        const mailOptions = {
            from: "reposicao@tecnotextil.net",
            to: "kaue.siqueira@tecnotextil.net",
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('E-mail enviado com sucesso para o destinatário!')
            return "E-mail enviado com sucesso para o destinatário!";
        } catch (error) {
            console.log(`Erro ao enviar o e-mail: ${error}`);
            throw new Error(`Erro ao enviar o e-mail: ${error}`);
        }
        
    }
}

export default new Mail;