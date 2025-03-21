import TicketOutputDTO from '../dto/output/ticket.output.dto.js';
import {ticketDao} from '../dao/ticket.dao.js'

class TicketRepository{
    constructor(dao){
        this.dao = dao
    }

    async getAllTickets() {
        try {
            const response = await this.dao.getAllTickets();
            return response.map(ticket => new TicketOutputDTO(ticket));
        } catch (e) {
            throw new Error(e);
        }
    }

    async createTicket(ticket) {
        try {
            const response = await this.dao.createTicket(ticket);
            return new TicketOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }
}


export const ticketRepository = new TicketRepository(ticketDao);