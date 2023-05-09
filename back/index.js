const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/User');
const Request = require('./models/Request');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'dfglgkdfdfg';

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://Andrey:Almashi@cluster0.puwivj4.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/application', async (req, res) => {
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
            author: info.id,
        });
        res.json(requestDoc);
    });
});

app.get('/application', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const author = info.id;
            const requests = await Request.find({ author })
                .populate('author', ['username'])
                .sort({ createdAt: -1 })
                .limit(20);
            res.json(requests);
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
});

app.put('/application', async (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            const { id, title, fullName, email, phone, description } = req.body;
            const requestDoc = await Request.findById(id)
            const isAuthor = JSON.stringify(requestDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(400).json('you are not the author')
            }

            await requestDoc.updateOne({
                title,
                fullName,
                email,
                phone,
                description
            });
            res.json(requestDoc);
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
});

app.get('/application/:id', async (req, res) => {
    const {id} = req.params;
    const requestDoc = await Request.findById(id).populate('author', ['username']);
    res.json(requestDoc)
});

app.listen(4000);
