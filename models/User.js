import { Schema, model } from "mongoose";

const User = new Schema({
    name: {type: String, required: true},
    passport_data: {type: String},
    driver_licens: {type: String},
    purchase_history: [{type: String, ref: 'Sale_act'}],
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, required: true}],
})

export default model('User', User)