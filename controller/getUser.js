const counterModel = require("../models/counterModel");
const userModel = require("../models/userModel");
const roomData = require("../utils/roomData")

async function generateReferenceNumber() {
  try {
    const counter = await counterModel.findOneAndUpdate(
      { name: "userReferenceNumber" },
      { $inc: { count: 1 } }
    );
  } catch (error) {
    console.error("Error generating reference number:", error);
  }
}
async function checkSlot (startDate, endDate, roomType, roomNumber) {
  try {
    const reservations = await userModel.find({ roomType, roomNumber });
    // console.log(req.body);
    // Check for overlap with existing reservations
    const available = roomData.find((room) => room.Type == roomType);
    const total = available.Number;
    if(total < roomNumber) {
      return 0;
    }
    let operation = 1;
    // console.log('required date :', startDate, endDate);
    reservations.map((room) => {
        if(!operation) {return;}
        // console.log(room.startDate, room.endDate);
        if(startDate >= room.startDate && startDate <= room.endDate) {
            operation = 0;
            // console.log("okay-1");
        }
        if(endDate >= room.startDate && endDate <= room.endDate) {
            // console.log("okay-2");
            operation = 0;
        }
    });
    // console.log(reservations);
    console.log(operation);
    if(!operation) {
      return 1;
    }
    return 2;
  }
  catch(err) {
    console.log(err);
  }
}
const createUser = async (req, res) => {
  try {
    // check whether this time slot is available or not
    const check = await checkSlot(req.body.startDate, req.body.endDate, req.body.roomType, req.body.roomNumber);
    console.log(check);
    if(check === 0) {
      return res.status(200).send({
        message: 'Invalid Room Number',
        success: false
      })
    }
    else if(check === 1) {
      return res.status(200).send({
        message: 'Slot Not Available',
        success: false
      })
    }
    const user = await userModel(req.body);
    await user.save();
    generateReferenceNumber();

    return res.status(200).send({
      message: "Room Booked",
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
};

const getUser = async(req, res) => {
  try {
    const temp = req.body.refNo || req.query.refNo ;
    const user = await userModel.findOne({ refNo: temp});
    if (!user) {
      return res.status(200).send({
        message: "Invalid RefNo",
        success: false,
      });
    }
    return res.status(200).send({
      message: "success",
      success: true,
      user,
    });
  }
  catch(err) {
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
}

const editUser = async (req, res) => {
  try {
    const check = await checkSlot(req.body.startDate, req.body.endDate, req.body.roomType, req.body.roomNumber);
    if(check === 0) {
      return res.status(200).send({
        message: 'Invalid Room Number',
        success: false
      })
    }
    else if(check === 1) {
      return res.status(200).send({
        message: 'Slot Not Available',
        success: false
      })
    }
    const temp = await userModel.findOne({ refNo: req.body.refNo });
    if (!temp) {
      return res.status(200).send({
        message: "Not found",
        success: false,
      });
    }
    Object.assign(temp, req.body);
    const user = await temp.save();
    return res.status(200).send({
      message: "Booking edited",
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).send({
      message: "failed",
      success: false,
      err,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ refNo: req.body.refNo });
    await userModel.findOneAndDelete({ refNo: req.body.refNo });
    // calculate the charge applied to this deletion
    const charge = 0;
    return res.status(200).send({
      message: "deleted successfully",
      success: true,
      user,
      charge,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "failed to error",
      success: false,
      err,
    });
  }
};
module.exports = { createUser, editUser, deleteUser, getUser};
