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
module.exports = { jsUcfirst, formatMoney, getDate, formatAMPM };
