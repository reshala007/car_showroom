import { Schema, model } from "mongoose";

const TestDrive = new Schema({
    car: { type: String, required: true }, // Автомобиль
    date: { type: Date, required: true }, // Дата проведения тест-драйва
    duration: { type: Number, required: true }, // Приблизительное время проведения тест-драйва в минутах
    status: { type: String, default: 'available' }, // Статус (свободен/занят)
    client_id: { type: String, default: null }, // ID клиента
    start_time: { type: Date, default: null }, // Время начала тест-драйва
    end_time: { type: Date, default: null }, // Время окончания тест-драйва
    damage_report: { type: String, default: 'none' }, // Отчет о повреждениях
    fine_amount: { type: Number, default: 0 } // Сумма штрафа
});

export default model('TestDrive', TestDrive);
