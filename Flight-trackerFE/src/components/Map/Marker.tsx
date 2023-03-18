import { Paper, Rating } from "@mui/material";
import "./Marker.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Marker = (props: any) => {
  const { matches, place } = props;
  return (
    <div className="markerContainer">
      {!matches ? (
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      ) : (
        <Paper elevation={3} className={"paper"}>
          <h5>{place.name}</h5>
          <img
            className={"pointer"}
            src={
              place?.photo
                ? place.photo.images.large.url
                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
            }
            alt="place"
          />
          <Rating
            name="read-only"
            size="small"
            value={Number(place.rating)}
            readOnly
          />
        </Paper>
      )}
    </div>
  );
};

export default Marker;
