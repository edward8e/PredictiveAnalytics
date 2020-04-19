import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({ lat, lng ,...props}) => {
  return (
    <Map
      google={props.google}
      zoom={11}
      style={mapStyles}
      initialCenter={{ lat, lng }}
    >
      <Marker position={{ lat, lng }} />
    </Map>
  );
}


const mapStyles = {
  width: "100%",
  height: "100%"
};

export default
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
  })(MapContainer);
