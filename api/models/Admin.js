import { Schema, model } from "mongoose";

const Admin = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, required: true}],
})

export default model('Admin', Admin)