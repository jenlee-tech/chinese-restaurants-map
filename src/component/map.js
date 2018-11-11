/* global google */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

window.gm_authFailure = () => {
  alert("Opps! please check your Google API key");
};

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{
        lat: 41.76371,
        lng: -72.685097
      }}
      center={props.center}
    >
      {/*details of the info window*/}
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx, arr) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );
            return (
              <Marker
                key={idx}
                position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={
                  arr.length === 1
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >
                {marker.isOpen && (
                  <InfoWindow>
                    <div>
                      <p>{venueInfo.name}</p>
                      <p>
                        {venueInfo.location.address ||
                          "sorry, no address found"}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

//map is rendered with below Google API key
class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBqYA1MdhLWMfXFQKwfA9r9FXWgTkdb7iA"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: "75%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
//had to add the first line in order for the bounce to work.
