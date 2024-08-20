const router = require("express").Router()
const dataController = require("../controllers/data")

const dataRoutes = (app) => {
    router.post("/collect", dataController.serveData);
    router.get("/retrieve/:id", dataController.FindLastData)
    // router.get("/retrieve/:id", dataController.fetchDataLogs)
    router.get("/graphdata/:deviceId", dataController.serveGraphData)
    return app.use("/data",router)
}

module.exports = {dataRoutes}