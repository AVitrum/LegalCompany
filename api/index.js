const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://Andrey:Almashi@cluster0.puwivj4.mongodb.net/?retryWrites=true&w=majority');

app.use('/', routes);

app.listen(4000);
