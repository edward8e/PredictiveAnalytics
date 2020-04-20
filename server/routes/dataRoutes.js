const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireAdmin = require("../middlewares/requireAdmin");

const Category = mongoose.model('categories');
const MenuItem = mongoose.model("menuItems");

const syncReportData = require("../services/SyncData").syncReportData;
module.exports = async app => {
 const REPORT_DATA = await syncReportData();
//  console.log(REPORT_DATA)
 
};
