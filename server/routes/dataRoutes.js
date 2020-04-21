const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const MenuItem = mongoose.model("menuItems");
const AnalyticResult = mongoose.model("analyticResult");

const syncReportData = require("../services/SyncData").syncReportData;
module.exports = app => {
    app.post("/api/update", async (req, res) => {
       const RESULT_DATA = [];
    const REPORT_DATA = [];
    // REPORT_DATA = await syncReportData("./data/report");

    for (item of REPORT_DATA) {
        const menuItem = new MenuItem({
            itemName: item['Name'],
            sold: item['Sold'],
            refunded: item['Refunded'],
            grossSales: item['Gross Sales'],
            discounts: item['Discounts'],
            refunds: item['Refunds'],
            netSales: item['Net Sales'],
            netSalesPer: item['% Net Sales'],
            avgNetSales: item['Abg Net Sales'],
            cogs: item['COGS'],
            dayOfWeek: item['Day of Week'],
            weekend: item['Weekend'],
            weekOfMonth: item['Week of Month'],
            dayTemp: item['Day Temperature Cel'],
            grossProfit: item['Gross Profit'],
            date: item['Date'],
            dateCreated: Date.now(),
            dateUpdated: new Date()
        });
        console.log("Processing " + item["Name"])

        try {
            const dbItem = await MenuItem.findOne({ $and: [{ itemName: item["Name"] }, { date: item["Date"] }] });
            if (dbItem === null) {
                await menuItem.save();
            } else {
                await MenuItem.updateOne({ $and: [{ itemName: item["Name"] }, { date: item["Date"] }] }, menuItem);
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log('finished')


    // RESULT_DATA = await syncReportData("./data/results");

    for (item of RESULT_DATA) {
        const analyticResult = new AnalyticResult({
            itemName: item['name'],
            r2: item['r2'],
            Sunday: item['Sunday'],
            Monday: item['Monday'],
            Tuesday: item['Tuesday'],
            Wednesday: item['Wednesday'],
            Thursday: item['Thursday'],
            Friday: item['Friday'],
            Saturday: item['Saturday'],
            dateCreated: Date.now(),
            dateUpdated: new Date()
        });
        console.log("Processing " + item["name"])

            try {
                const dbItem = await AnalyticResult.findOne({ itemName: item["name"]});
                if (dbItem === null) {
                    await analyticResult.save();
                } else {
                    await AnalyticResult.updateOne({ itemName: item["name"]}, analyticResult);
                }
            } catch (err) {
                console.log(err)
            }
    }
    console.log('finished')
    });
    

    app.get("/api/analytics", async (req, res) => {
        console.log("hiiiiiiiiiiiiiiiii")
        const analyticResult = await AnalyticResult.find();
        res.send(analyticResult);
    });
};
