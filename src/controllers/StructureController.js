const mongoose = require('mongoose');
const config = require('../../config');

const Structure = mongoose.model('Structure');

module.exports = {

    // Get all structures
    async index(req, res) {
        try {
            const { page = 1, title = '', limit = config.listLimit } = req.query;
            const structures = await Structure.paginate({ title: { $regex: title, $options: 'i' } }, { page, limit, sort: { title: 1 } });

            return res.status(200).json(structures);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Get a structure by id
    async show(req, res) {
        try {
            const structure = await Structure.findById(req.params.id);

            if (structure == null) return res.status(404).send();

            return res.status(200).json(structure);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Create a new structure
    async store(req, res) {
        try {
            const structure = await Structure.create(req.body);

            return res.status(201).json(structure);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Modify a structure
    async update(req, res) {
        try {
            const structure = await Structure.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

            if (structure == null) return res.status(404).send();

            return res.status(200).json(structure);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Delete a structure
    async destroy(req, res) {
        try {
            await Structure.findByIdAndDelete(req.params.id, { useFindAndModify: false });

            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    }
}