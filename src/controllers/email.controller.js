import { gmailConfig, transporter } from "../services/email.service.js";

export const sendMailGmail = async (req, res)=>{
    try {
        const {dest} = req.body;
        const mailOptions = gmailConfig(dest)
        const response = await transporter.sendMail(mailOptions)
        if(response.accepted.length > 0){
            res.status(200).send('Email sent successfully');
        }
    } catch (error) {
        console.log(error);
        next(e);
    }
}