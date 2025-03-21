import {ticketService} from '../services/ticket.service.js'


class TicketController {
    constructor(service) {
        this.service = service;

        this.getAllTickets = this.getAllTickets.bind(this);
        this.createTicket = this.createTicket.bind(this);
    }

    async getAllTickets(req, res, next) {
        try {
            const response = await this.service.getAllTickets();
            res.status(200).send(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async createTicket(req, res, next) {
        try {
            const response = await this.service.createTicket(req.body);
            res.status(201).send(response);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export const ticketController = new TicketController(ticketService);