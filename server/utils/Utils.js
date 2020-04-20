const fs = require("fs");
const path = require("path");

const jsUcfirst = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatMoney = function(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }

const getDate = function(date){
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    today = mm + '/' + dd + '/' + yyyy;
    return today;
    }

const formatAMPM = function(date) {
    var today = new Date(date);
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }



const fromDir = function(startPath, filter) {
    //console.log('Starting from dir '+startPath+'/');
    let filesComplete = [];
    if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath);
      return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        fromDir(filename, filter); //recurse
      } else if (filename.indexOf(filter) >= 0) {
        // console.log('-- found: ',filename);
        filesComplete.push(filename);
      }
    }
    return filesComplete;
  }
module.exports = { jsUcfirst, formatMoney, getDate, formatAMPM,fromDir };
