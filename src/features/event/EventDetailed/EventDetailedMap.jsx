import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon name="marker" size="big" color="red" />;

const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;

const EventDetailedMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <GoogleMapReact
        style={{ height: "300px", width: "100%", padding: 0 }}
        bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </Segment>
  );
};

export default EventDetailedMap;
