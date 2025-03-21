import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Importamos uuid para generar un código único

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        default: () => uuidv4().split('-')[0] 
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

export const ticketModel = model('Ticket', ticketSchema);
