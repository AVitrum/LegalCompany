const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const salt = bcrypt.genSaltSync(10);
const secret = 'dfglgkdfdfg';

const register = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        const userDoc = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt),
            isAdmin,
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    const username = userDoc.username;
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, email, id: userDoc._id, isAdmin: userDoc.isAdmin }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
                email,
                isAdmin: userDoc.isAdmin,
            });
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
};

const profile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

const logout = (req, res) => {
    res.cookie('token', '').json('ok');
};

module.exports = {
    register,
    login,
    profile,
    logout,
};
