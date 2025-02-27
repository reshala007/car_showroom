import { Schema, model } from "mongoose";

const InsurancePolicies = new Schema({
    car_id: {type: String, unique: true, required: true},
    client_id: {type: String, required: true},
    conditions: {type: String, required: true},
    price: {type: Number, required: true},
})

export default model('InsurancePolicies', InsurancePolicies)

