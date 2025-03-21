import { Router } from 'express';
import { sendMailGmail } from '../../controllers/email.controller.js';

const emailRouter = Router();

emailRouter.route('/send')
    .post(sendMailGmail)

export default emailRouter;