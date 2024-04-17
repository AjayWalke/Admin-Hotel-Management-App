const userModel = require("../models/userModel");

const viewRoomNo = async (req, res) => {
  try {
    const roomType = req.query.roomType || req.body.roomType;
    const roomNumber = req.query.roomNumber || req.body.roomNumber;
    const user = await userModel.find({ roomType, roomNumber});
    return res.status(200).send({
      message: "success",
      success: true,
      user,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
};

const viewStartDate = async (req, res) => {
  try {
    const startDate = (req.query.startDate || req.body.startDate) + " " + "00:00";
    const endDate = (req.query.endDate || req.body.endDate) + " " + "24:24";
    // console.log(startDate, endDate);
    const user = await userModel.find({startDate: { $gte: startDate, $lte: endDate}});
    // console.log(user);
    return res.status(200).send({
      message: "success",
      success: true,
      user,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
};

const viewAll = async(req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).send({
      message: 'done',
      success: true,
      user
    })
  }
  catch(err) {
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
}
module.exports = { viewRoomNo, viewStartDate, viewAll};
