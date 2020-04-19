const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const Order = mongoose.model("orders");
const keys = require("../config/keys");
const schedule = require('node-schedule');
const csv = require('csv-parser');

const reportsDir = '../data/report'

const syncReportData = function () {
    function fromDir(startPath,filter){
        //console.log('Starting from dir '+startPath+'/');
        let filesComplete = [];
        if (!fs.existsSync(startPath)){
            console.log("no dir ",startPath);
            return;
        }
        var files=fs.readdirSync(startPath);
        for(var i=0;i<files.length;i++){
            var filename=path.join(startPath,files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                fromDir(filename,filter); //recurse
            }
            else if (filename.indexOf(filter)>=0) {
                // console.log('-- found: ',filename);
                filesComplete.push(filename);
            };
        };
        return filesComplete;
      };
      console.log("hi");

      const dataFiles = fromDir(reportsDir,'.csv')
  };
  

module.exports = {syncReportData};
