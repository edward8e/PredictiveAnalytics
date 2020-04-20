const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const keys = require("../config/keys");
const schedule = require("node-schedule");
const csv = require('csvtojson')
const utils = require('../utils/Utils');
const reportsDir = "./data/report";



const syncReportData = async function () {
  let gatheredData = [];
  const dataFiles = utils.fromDir(reportsDir, ".csv");

  for (datafile of dataFiles) {
    const fileData = await csv().fromFile(datafile);
    gatheredData.push(fileData);
  }
  return gatheredData;
};

module.exports = { syncReportData };
