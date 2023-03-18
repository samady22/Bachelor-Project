import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";
import "../PlaceDetails/PlaceDetail.css";

const PlaceDetails = ({ place }: any) => {
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 200 }}
        image={
          place?.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {place.name}
        </Typography>
        <Box className="plce-details_review-box" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className="subtitle"
          >
            <LocationOnIcon style={{ marginRight: "5px" }} />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className="subtitle"
          >
            <PhoneIcon style={{ marginRight: "5px" }} /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
