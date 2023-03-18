import { useMediaQuery } from "@mui/material";
import GoogleMapReact from "google-map-react";
import _ from "lodash";
import Marker from "./Marker";
import "../Map/Marker.css";

const Map = ({ coords, places, setChildClicked, setBounds }: any) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyAYlG3KzHAdmqE069wT84VljQDKO86Bm9k" }}
      defaultCenter={coords}
      center={coords}
      defaultZoom={14}
      margin={[50, 50, 50, 50]}
      options={{
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      }}
      onChange={(e: any) => {
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
      }}
      onChildClick={(child) => {
        setChildClicked(child);
      }}
    >
      {!_.isNil(places) &&
        places?.data.map((place: any, i: any) => {
          if (place.latitude) {
            return (
              <Marker
                key={i}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                place={place}
                matches={matches}
              />
            );
          }
          return <></>;
        })}
    </GoogleMapReact>
  );
};

export default Map;
