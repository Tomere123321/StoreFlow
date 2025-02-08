const express = require("express");
const router = express.Router();
const jwt = require("../Middleware/token");
const adminRoute = require("../Middleware/adminRoutes");
const {getAnalyticsData, getDailySalesData} = require("../analytics/getAnalyticsData");

router.use(jwt, adminRoute);

router.get("/", async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();
        const endData = new Date();
        const startData = new Date(endData.getTime() -7 * 24 * 60 * 60 * 1000); // 7 days ago

        const dailyStateData = await getDailySalesData(startData, endData);

        res.json({analyticsData, dailyStateData});
    } catch (error) {
        console.error("Error in getting analytics data", error.message);
        res.status(500).json("Internal Server Error");
    }
});
module.exports = router;