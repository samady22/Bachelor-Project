import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import _ from "lodash";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const PlacesList = ({
  places,
  childClicked,
  setChildClicked,
  isLoaded,
  nearLoactionType,
  setNearType,
}: any) => {
  return (
    <>
      <h5
        style={{
          textAlign: "center",
          backgroundColor: "#9c27b0",
          color: "white",
          marginBottom: "10px",
        }}
      >
        Hotels, Restaurnts and Attractions around you
      </h5>
      {isLoaded ? (
        <div style={{ textAlign: "center", marginTop: "40%" }}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl
            margin={"normal"}
            size="small"
            style={{ display: "flex" }}
          >
            <InputLabel style={{ fontSize: "0.8rem" }} size="small">
              Type
            </InputLabel>
            <Select
              value={nearLoactionType}
              label={"Type"}
              onChange={(e) => {
                setNearType(e.target.value);
              }}
              size="small"
              style={{ fontSize: "0.8rem" }}
            >
              <MenuItem style={{ fontSize: "0.8rem" }} value={"restaurants"}>
                Restaurants
              </MenuItem>
              <MenuItem style={{ fontSize: "0.8rem" }} value={"hotels"}>
                Hotels
              </MenuItem>
              <MenuItem style={{ fontSize: "0.8rem" }} value={"attractions"}>
                Attractions
              </MenuItem>
            </Select>
            {!_.isNil(childClicked) && (
              <Button
                size="small"
                onClick={() => {
                  setChildClicked(null);
                }}
              >
                Show all
              </Button>
            )}
          </FormControl>
          <Grid container spacing={3}>
            {_.isNil(childClicked) ? (
              places.data?.map((place: any, index: any) => {
                return (
                  place.name && (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      className={"flight-details_hotel-restuarnt_list"}
                    >
                      <PlaceDetails place={place} />
                    </Grid>
                  )
                );
              })
            ) : (
              <Grid
                item
                xs={12}
                className={"flight-details_hotel-restuarnt_list"}
              >
                <PlaceDetails place={places?.data[childClicked]} />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default PlacesList;
