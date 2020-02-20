const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StructureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rebuyLevel: {
        type: Number,
        required: false
    },
    addonLevel: {
        type: Number,
        required: false
    },
    levels: [
        {
            sequence: {
                type: Number,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            breakTime: {
                type: Number,
                required: false
            },
            smallBlind: {
                type: Number,
                required: true
            },
            bigBlind: {
                type: Number,
                required: true
            },
            ante: {
                type: Number,
                required: false
            }
        }
    ]
});

StructureSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Structure', StructureSchema, 'structures');