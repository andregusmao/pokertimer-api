const mongoose = require('mongoose');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

// Start JWT
require('dotenv-safe').load();

module.exports = {

    // Get all users
    async index(req, res) {
        try {
            const { page = 1, name = '', email = '' } = req.query;
            const users = await User.paginate({ name: { $regex: name, $options: 'i' } }, { page, limit: config.listLimit, sort: { name: 1 } });

            return res.status(200).json(users);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Get an user by id
    async show(req, res) {
        try {
            const user = await User.findById(req.params.id);

            if (user == null) return res.status(404).send();

            return res.status(200).json(user);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Create a new user
    async store(req, res) {
        try {
            const user = await User.create(req.body);

            return res.status(201).json(user);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Modify an user
    async update(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

            if (user == null) return res.status(404).send();

            return res.status(200).json(user);
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Delete an user
    async destroy(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id, { useFindAndModify: false });

            return res.status(204).send();
        } catch (e) {
            return res.status(400).json({
                error: 'An error occurred',
                details: e
            });
        }
    },

    // Authenticate an user
    async login(req, res) {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });

        if (user == null) return res.status(404).send();

        var token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET, {
            expiresIn: 3600
        });

        return res.status(200).send({ auth: true, token, isAdmin: user.isAdmin });
    },

    // Authorize an user
    async verify(req, res, next) {
        var header = req.headers["authorization"];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            jwt.verify(token, process.env.SECRET, (err, result) => {
                if (err) {
                    return res.status(403).send();
                } else {
                    next()
                }
            })
        } else {
            return res.status(403).send();
        }
    },

    // Authorize an admin user
    async verifyAdmin(req, res, next) {
        var header = req.headers["authorization"];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            jwt.verify(token, process.env.SECRET, (err, result) => {
                if (err) {
                    res.status(403).send();
                } else {
                    if (result.isAdmin) {
                        next()
                    } else {
                        return res.status(403).send();
                    }
                }
            })
        } else {
            return res.status(403).send();
        }
    }
}