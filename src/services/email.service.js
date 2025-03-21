import { createTransport } from "nodemailer";
import env from '../utils/envVariables.js';
import { passwordRecoveryTemplate } from '../views/templates/passwordRecovery.js'


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

const resetLink = "https://www.youtube.com/" //Enlace donde pueda resetear su contraseña

//Mail config va a tener los parametros sobre quien envía el mail,
export const gmailConfig = (dest) => {
    return ({
        from: env.emailUser, //Envía
        to: dest,   //Recibe
        subject: 'Password Recovery', //Asunto
        html: passwordRecoveryTemplate(resetLink), //Que se muestra
        // attachments: [ //Permite adjuntar archivos al mail
        //     {
        //         path: `${process.cwd()}/src/services/texto.txt`,
        //         filename: 'resumen-cuentas.txt'
        //     }
        // ]
    })
}