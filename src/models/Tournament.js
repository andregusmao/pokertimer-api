const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TournamentSchema = new mongoose.Schema({
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
    ],
    startTime: {
        type: Date,
        required: false
    },
    currentLevel: {
        type: Number,
        required: false
    },
    currentTime: {
        type: Number,
        required: false
    },
    status: {
        type: Number, // 0 = created, 1 = started, 2 = paused, 3 = finished, 4 = canceled
        required: true
    }
});

TournamentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tournament', TournamentSchema, 'tournaments');

