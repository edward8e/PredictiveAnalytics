const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const schedule = require("node-schedule");
const csv = require('csvtojson')
const utils = require('../utils/Utils');


const syncReportData = async function (dirPath) {
  let gatheredData = [];
  const dataFiles = utils.fromDir(dirPath, ".csv");

  for (datafile of dataFiles) {
    const fileData = await csv().fromFile(datafile);
    gatheredData = [...gatheredData, ...fileData]
  }
  return gatheredData;
};

module.exports = { syncReportData };
