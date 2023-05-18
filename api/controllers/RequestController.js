const jwt = require('jsonwebtoken');

const Request = require('../models/Request');

const secret = 'dfglgkdfdfg';

const create = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, fullName, email, phone, description } = req.body;
        const requestDoc = await Request.create({
            title,
            fullName,
            email,
            phone,
            description,
            reaction: '',
            author: info.id,
        });
        res.json(requestDoc);
    });
};

const getAll = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            if (info.isAdmin) {
                const requests = await Request.find({})
                    .populate('author', ['username'])
                    .sort({ createdAt: -1 })
                    .limit(20);
                res.json(requests);
            } else {
                const author = info.id;
                const requests = await Request.find({ author })
                    .populate('author', ['username'])
                    .sort({ createdAt: -1 })
                    .limit(20);
                res.json(requests);
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

const update = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const { id, title, fullName, email, phone, description, reaction } = req.body;
            const requestDoc = await Request.findById(id);
            const isAuthor = JSON.stringify(requestDoc.author) === JSON.stringify(info.id) || info.isAdmin;
            if (!isAuthor) {
                return res.status(400).json('You are not the author');
            }

            await requestDoc.updateOne({
                title,
                fullName,
                email,
                phone,
                description,
                reaction,
            });
            res.json(requestDoc);
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    const requestDoc = await Request.findById(id).populate('author', ['username']);
    res.json(requestDoc);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const requestDoc = await Request.findByIdAndDelete(id);
        res.json(requestDoc);
    } catch (e) {
        res.status(400).json(e);
    }
};

module.exports = {
    create,
    getAll,
    update,
    getById,
    deleteById,
};
