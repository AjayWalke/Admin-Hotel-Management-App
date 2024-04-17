const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectdb = require("./config/db");

dotenv.config({path: './utils/.env'});

const app = new express();
connectdb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;

app.use('/api/v1/counter', require('./routes/counter'));
app.use('/api/v1/view', require('./routes/view'));
app.use('/api/v1/user', require('./routes/user'));

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});