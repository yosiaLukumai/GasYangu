const dataModel = require("./../models/data");
const userModel = require("./../models/users");
const createOutput = require("../utils").createOutput;
const io = require("./../index")
const serveData = async (req, res) => {
    try {
        // let { temp, hum, size, deviceId } = req.body;
        let { deviceId, weight, ReminderValue, GasSize } = req.body;
        // console.log(deviceId, weight);
        // console.log(ReminderValue);
        // console.log(GasSize);
        // query the device id to get userId
        // console.log(req.body);
        if(GasSize != 0) {
            const found = await userModel.findOne({ deviceId: deviceId });
            if (found) {
                // save the data to the database
                const saved = await dataModel.create({ deviceId, weight, ReminderValue, GasSize });
                if (saved) {
                    // fire a socket to notify there is new data...
                    io.Socket.emit("newData", saved)
                    return res.json({ status: 1, message: "Data saved sucessfully" })
                } else {
                    return res.json({ status: 0, message: "Failed to save the data" })
                }
            } else {
                return res.json({ status: 0, message: "Device not registered..." })
            }
        }else {
            return res.json({ status: 0, message: "Device not registered..." })
        }


    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


const serveGraphData = async (req, res) => {
    try {
        const deviceId = req.params.deviceId
        const found = await userModel.findOne({ deviceId: String(deviceId) });
        if (found) {
            const fiveLastData = await dataModel.find({ deviceId: found?.deviceId }, null, { createdAt: -1 }).limit(25).exec();
            
            return res.json(createOutput(true, fiveLastData))
        } else {
            return res.json({ status: 0, message: "Device not registered..." })
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}

const fetchDataLogs = async (req, res) => {
    try {
        let userId = req.params.id
        let user = await userModel.findById(userId)
        if (user) {
            // checking if the parameter is of what type
        
                const data = await dataModel.find(null, null, { sort: { createdAt: -1 } }).exec();
                return res.json(createOutput(true, data))
        } else {
            return res.json(createOutput(true, "No such user", true));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


const FindLastData = async (req, res) => {
    try {

        const id = req.params.id;
        const user = await userModel.findById(id);
        if (user) {
            
            // tries to retrieve the data
            let retrievedData = await dataModel.findOne(null, null, { sort: { createdAt: -1 }, limit: 1 }).exec();
            if (retrievedData) {
                return res.json(createOutput(true, retrievedData))
            } else {
                return res.json(createOutput(true, "Can't retrieve the data"))
            }

        } else {
            return res.json(createOutput(false, "No such user Data", true));
        }
    } catch (error) {
        return res.json(createOutput(false, error.message, true));
    }
}


module.exports = {
    serveData,
    FindLastData,
    fetchDataLogs,
    serveGraphData,
}

