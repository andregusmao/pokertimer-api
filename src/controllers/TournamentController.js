const mongoose = require('mongoose');
const config = require('../../config');

const Tournament = mongoose.model('Tournament');

module.exports = {

    // Get all tournaments
    async index(req, res) {
        try {
            const { page = 1, title = '' } = req.query;
            const tournaments = await Tournament.paginate({ title: { $regex: title, $options: 'i' } }, { page, limit: config.listLimit, sort: { title: 1 } });

            return res.status(200).json(tournaments);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Get a tournament by id
    async show(req, res) {
        try {
            const tournament = await Tournament.findById(req.params.id);

            if (tournament == null) return res.status(404).send();

            return res.status(200).json(tournament);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Create a new tournament
    async store(req, res) {
        try {
            const tournament = await Tournament.create(req.body);

            return res.status(201).json(tournament);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Modify a tournament
    async update(req, res) {
        try {
            const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

            if (tournament == null) return res.status(404).send();

            return res.status(200).json(tournament);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Delete a tournament
    async destroy(req, res) {
        try {
            await Tournament.findByIdAndDelete(req.params.id, { useFindAndModify: false });

            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    }
}