const counterModel = require("../models/counterModel");

const counter= async (req, res) => {
    try {
        const counter = await counterModel.findOne({name: "userReferenceNumber"});
        return res.status(200).send({
            message:'success',
            success:true,
            counter
        })
    }
    catch(err) {
        console.log(err);
        return res.status(500).send({
            message:'counter failed',
            success: false
        })
    }
}
module.exports = counter;