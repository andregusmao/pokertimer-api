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
                error: 'Ocorreu um erro',
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
                error: 'Ocorreu um erro',
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
                error: 'Ocorreu um erro',
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
                error: 'Ocorreu um erro',
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
                error: 'Ocorreu um erro',
                details: e
            });
        }
    },

    // Change a tournament status
    async changeStatus(req, res) {
        try {
            const tournament = await Tournament.findById(req.params.id);

            if (!tournament) {
                return res.status(404).send();
            }

            switch (req.body.status) {
                case 1:
                    switch (tournament.status) {
                        case 0:
                            tournament.startTime = new Date();
                            break;
                        case 1:
                            return res.status(400).json({
                                error: 'Torneio já iniciado'
                            });
                            break;
                        case 3:
                            return res.status(400).json({
                                error: 'Tournament encerrado'
                            });
                            break;
                        case 4:
                            return res.status(400).json({
                                error: 'Torneio cancelado'
                            });
                            break;
                    }
                    break;
                case 2:
                    switch (tournament.status) {
                        case 0:
                            return res.status(400).json({
                                error: 'Torneio ainda não iniciado'
                            });
                            break;
                        case 2:
                            return res.status(400).json({
                                error: 'Torneio pausado'
                            });
                            break;
                        case 3:
                            return res.status(400).json({
                                error: 'Torneio encerrado'
                            });
                            break;
                        case 4:
                            return res.status(400).json({
                                error: 'Torneio cancelado'
                            });
                            break;
                    }
                    break;
                case 3:
                    switch (tournament.status) {
                        case 0:
                            return res.status(400).json({
                                error: 'Torneio ainda não iniciado'
                            });
                            break;
                        case 3:
                            return res.status(400).json({
                                error: 'Torneio já encerrado'
                            });
                            break;
                        case 4:
                            return res.status(400).json({
                                error: 'Torneio cancelado'
                            });
                            break;
                        default:
                            tournament.finishTime = new Date();
                    }
                    break;
            }

            tournament.status = req.body.status;

            await Tournament.updateOne({ _id: req.params.id }, tournament);

            return res.status(200).json(tournament);
        } catch (e) {
            return res.status(400).json({
                error: 'Ocorreu um erro',
                details: e
            });
        }
    },

    // Update tournament time
    async changeTime(req, res) {
        try {
            const tournament = await Tournament.findById(req.params.id);

            if (!tournament) {
                return res.status(404).send();
            }

            const level = tournament.levels.find(l => l.sequence === req.body.currentLevel);

            if (!level) {
                return res.status(400).json({
                    error: 'Nível inexistente'
                });
            }

            if (req.body.currentTime > level.duration || req.body.currentTime < 0) {
                return res.status(400).json({
                    error: `Duração inválida para o nível ${level.sequence}`
                });
            }

            switch (tournament.status) {
                case 0:
                    return res.status(400).json({
                        error: 'Torneio ainda não iniciado'
                    });
                    break;
                case 3:
                    return res.status(400).json({
                        error: 'Torneio encerrado'
                    });
                    break;
                case 4:
                    return res.status(400).json({
                        error: 'Torneio cancelado'
                    });
                    break;
            }

            tournament.currentLevel = req.body.currentLevel;
            tournament.currentTime = req.body.currentTime;

            await Tournament.updateOne({ _id: req.params.id }, tournament);

            return res.status(200).json({
                currentLevel: tournament.currentLevel,
                currentTime: tournament.currentTime,
                level
            });

        } catch (e) {
            return res.status(400).json({
                error: 'Ocorreu um erro',
                details: e
            });
        }
    }
}