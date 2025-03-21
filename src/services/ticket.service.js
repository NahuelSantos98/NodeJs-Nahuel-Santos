import { ticketRepository } from "../repository/ticket.repository.js";

class TicketService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllTickets() {
        try {
            const response = await this.repository.getAllTickets();
            if (!response) throw new Error("Tickets not found");
            return response;
        } catch (error) {
            throw new Error("Error retrieving all tickets: " + error.message);
        }
    }

    async createTicket(body) {
        try {
            const response = await this.repository.createTicket(body);
            if (!response) throw new Error("Ticket not created");
            return response;
        } catch (error) {
            throw new Error("Error creating ticket: " + error.message);
        }
    }
}

export const ticketService = new TicketService(ticketRepository);