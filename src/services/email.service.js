import { createTransport } from "nodemailer";
import env from '../utils/envVariables.js';
import { purchaseTicketTemplate } from '../views/templates/purchaseTicketTemplate.js'


//Se crea el objeto de transporte de nodemailer que va a guardar las credenciales:
export const transporter = createTransport({
    service: 'gmail',
    secure: true,
    port: env.emailPort,
    auth: {
        user: env.emailUser,
        pass: env.emailPass
    }
})

//Mail config va a tener los parametros sobre quien envía el mail,
export const gmailConfig = (ticket, email) => {
    return ({
        from: env.emailUser, //Envía
        to: email,   //Recibe
        subject: 'Purchase Ticket', //Asunto
        html: purchaseTicketTemplate(ticket, email),
    })
}