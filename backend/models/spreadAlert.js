const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spreadAlert = new Schema({
    market_id: {
        type: String,
        required: true,
        unique: true
    },
    alert_value: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Spread must be positive.'],
    }
});

module.exports = mongoose.model('SpreadAlert', spreadAlert);
