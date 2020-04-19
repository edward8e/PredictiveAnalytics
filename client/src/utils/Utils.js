import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, authed, authLevel, ...rest }) {
  if (authed && (authed.accountType === authLevel || authed.accountType === "admin") && authed.validated === true) {
    authed = true;
  }
  return (
    <Switch>
      <Route
        {...rest}
        render={props =>
          authed === true ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            )
        }
      />
    </Switch>
  );
}

export function formatMoney(number) {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function formatDay(date) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[date.getDay()];
}

export function formatAMPM(date) {
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

export function getDate(date) {
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

export function formalDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var today = new Date(date);
  var dd = today.getDate();
  var mm = monthNames[today.getMonth()]

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = mm + ' ' + dd + ', ' + yyyy;
  return today;
}

export function organizeOnDate(set, dateLocation, reverse = false) {
  return set.sort(function compare(a, b) {
    var dateA = new Date(a[dateLocation]);
    var dateB = new Date(b[dateLocation]);
    return reverse ? dateB - dateA : dateA - dateB;
  });
};

export function combineDateTime(date, time) {
  var dateEvent = new Date(date);
  var timeEvent = new Date(time);
  var hh = timeEvent.getHours();
  var mm = timeEvent.getMinutes();
  dateEvent.setHours(hh)
  dateEvent.setMinutes(mm)
  return dateEvent;
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") { dist = dist * 1.609344 }
    if (unit === "N") { dist = dist * 0.8684 }
    return dist;
  }
}

export function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkMobile() {

  return window.innerWidth <= 760;
}

export const restaurantAddress = {
  distance: 0,
  address_components: [
    { types: ["street_number"], long_name: "12630" },
    { types: ["route"], long_name: "Perris Boulevard" },
    { types: ["locality", "political"], long_name: "Moreno Valley" },
    { types: ["administrative_area_level_2", "political"], long_name: "Riverside County" },
    { types: ["administrative_area_level_1", "political"], long_name: "California" },
    { types: ["country", "political"], long_name: "United States" },
    { types: ["postal_code"], long_name: "92553" },
    { types: ["postal_code_suffix"], long_name: "4141" }
  ],
  formatted_address: "12630 Perris Blvd, Moreno Valley, CA 92553, USA",
  geometry: {
    bounds: {
      south: 33.9371297,
      west: -117.22593740000002,
      north: 33.9372656,
      east: -117.22564469999998
    },
    location: {
      lat: 33.937217,
      lng: -117.22578099999998
    },
    location_type: "ROOFTOP",
    viewport: {
      south: 33.9358486697085,
      west: -117.22714003029148,
      north: 33.9385466302915,
      east: -117.22444206970852
    },
    place_id: "ChIJ03Zf2y2m3IARDOC5iN2NncQ"
  },
  types: ["premise"],
}


export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
 }

 export function getMinDate(days = 3){
  const today = new Date();
  const minimum = new Date(today);
  minimum.setDate(minimum.getDate() + days);
  minimum.setHours(9,0,0);
  return minimum;
 }

 export const timeOptions = [
  { label: '9:00AM', value: 'Mon Jan 1 2020 9:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '9:30AM', value: 'Mon Jan 1 2020 9:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '10:00AM', value: 'Mon Jan 1 2020 10:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '10:30AM', value: 'Mon Jan 1 2020 10:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '11:00AM', value: 'Mon Jan 1 2020 11:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '11:30AM', value: 'Mon Jan 1 2020 11:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '12:00PM', value: 'Mon Jan 1 2020 12:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '12:30PM', value: 'Mon Jan 1 2020 12:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '1:00PM', value: 'Mon Jan 1 2020 13:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '1:30PM', value: 'Mon Jan 1 2020 13:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '2:00PM', value: 'Mon Jan 1 2020 14:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '2:30PM', value: 'Mon Jan 1 2020 14:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '3:00PM', value: 'Mon Jan 1 2020 15:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '3:30PM', value: 'Mon Jan 1 2020 15:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '4:00PM', value: 'Mon Jan 1 2020 16:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '4:30PM', value: 'Mon Jan 1 2020 16:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '5:00PM', value: 'Mon Jan 1 2020 17:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '5:30PM', value: 'Mon Jan 1 2020 17:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '6:00PM', value: 'Mon Jan 1 2020 18:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '6:30PM', value: 'Mon Jan 1 2020 18:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '7:00PM', value: 'Mon Jan 1 2020 19:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '7:30PM', value: 'Mon Jan 1 2020 19:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '8:00PM', value: 'Mon Jan 1 2020 20:00:00 GMT-0800 (Pacific Standard Time)' }, { label: '8:30PM', value: 'Mon Jan 1 2020 20:30:00 GMT-0800 (Pacific Standard Time)' },
  { label: '9:00PM', value: 'Mon Jan 1 2020 21:00:00 GMT-0800 (Pacific Standard Time)' }
];