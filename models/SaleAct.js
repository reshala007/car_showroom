import { Schema, model } from "mongoose";

const SaleAct = new Schema({
    car_id: {type: String, required: true},
    client_id: {type: String, required: true},
    manager_id: {type: String, required: true},
    sale_date: {type: String, required: true},
    additional_features: [{type: String, default: 'none'}],
    total_price: {type: Number, required}
})

export default model('SaleAct', SaleAct)


