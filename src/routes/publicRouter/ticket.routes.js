import { Router } from "express";
import { ticketController } from '../../controllers/ticket.controller.js'

const ticketRouter = Router()

ticketRouter.route("/")
    .get(ticketController.getAllTickets)
    .post(ticketController.createTicket)

export default ticketRouter;