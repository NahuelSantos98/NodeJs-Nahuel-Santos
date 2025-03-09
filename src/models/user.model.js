import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'carts'
    },
    role: {
        type: String,
        default: "USER",
    }
});



const userModel = model("users", UserSchema);

export default userModel