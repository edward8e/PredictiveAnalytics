require('@tensorflow/tfjs-node');
const path = require('path');
const fs = require('fs');
const csv = require('csv');
const cliProgress = require('cli-progress');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

const reportDir = '../../Restaurant Sales/report'
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

///////////////////
// start
///////////////////
let dataInfo = [];
let listOfR2 = [];
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);


const dataFiles = fromDir(reportDir, '.csv');
// start the progress bar with a total value of 200 and start value of 0
bar1.start(dataFiles.length, 0);


for(dataFile of dataFiles){
  let singleData = [path.basename(dataFile)];
  // update the current value in your application..
  // console.log("\n\n"+dataFile)
  bar1.increment();
  
//  dataFile = '../../Restaurant Sales/report/Combination de Dos.csv'

let { features, labels, testFeatures, testLabels } = loadCSV(dataFile, {
  shuffle: true,
  splitTest: 50,
  dataColumns: ['Day of Week', "Weekend","Week of Month","Day Temperature Cel"],
  labelColumns: ['Sold']
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.01,
  iterations: 30,
  batchSize: 10
});

regression.train();
// console.log(features)
const r2 = regression.test(testFeatures, testLabels);
listOfR2.push(r2)

plot({
  x: regression.mseHistory.reverse(),
  xLabel: 'Iteration #',
  yLabel: 'Mean Squared Error'
});

// if(r2 > 0.3){
  // console.log("\n\n"+dataFile)
  // console.log('R2 is', r2);

//   console.log("Sunday");
let Sunday = regression.predict([[0, 1,1, 25]]).get(0,0);
// console.log("Monday");
let Monday = regression.predict([[1,0,1, 25]]).get(0,0);
// console.log("Tuesday");
let Tuesday = regression.predict([[2,0,1, 25]]).get(0,0);
// console.log("Wednesday");
let Wednesday = regression.predict([[3,0,1, 25]]).get(0,0);
// console.log("Thursday");
let Thursday = regression.predict([[4,0,1, 25]]).get(0,0);
// console.log("Friday");
let Friday = regression.predict([[5,1,1, 25]]).get(0,0);
// console.log("Saturday");
let Saturday = regression.predict([[6,1,1, 25]]).get(0,0);
// }
singleData.push(r2)
singleData.push(Sunday);
singleData.push(Monday);
singleData.push(Tuesday);
singleData.push(Wednesday);
singleData.push(Thursday);
singleData.push(Friday);
singleData.push(Saturday);

dataInfo.push(singleData)
}

let COMPLETE_DATA = [
  ['name', 'r2', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday']
];
COMPLETE_DATA = [...COMPLETE_DATA, ...dataInfo]
var file = fs.createWriteStream('array.csv');

file.on('error', function(err) { /* error handling */ });
COMPLETE_DATA.forEach(function(v) { file.write(v.join(', ') + '\n'); });
file.end();


// stop the progress bar
bar1.stop();
console.log(Math.max(listOfR2))
console.log(listOfR2)

