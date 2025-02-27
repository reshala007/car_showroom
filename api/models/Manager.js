import { Schema, model } from "mongoose";

const Manager = new Schema({
    name: {type: String, required: true},
    sales_history: [{type: String, ref: 'Sale_act'}],
    test_drives : [{type: String, ref: 'Test_drive'}],
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, required: true}],
    icon: {type: String, default: ''}
})

export default model('Manager', Manager)