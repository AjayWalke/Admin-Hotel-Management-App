const mongoose = require('mongoose');
const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to database ${process.env.MONGO_URL}`);
    }
    catch(err) {
        console.log(err);
    }
};
module.exports = db;