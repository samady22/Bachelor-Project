import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  TextField,
} from "@mui/material";
import "./HomePage.css";
import bgVideo from "../../Assest/Video/bgVid.mp4";
import { useNavigate } from "react-router-dom";
import flightService from "../../services/flightService";
import Footer from "../../components/Footer/Footer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import _ from "lodash";
import { useEffect, useState } from "react";
import { getCookie, getCurrentUser } from "../../services/authenticate";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 170,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "number",
    headerName: "Flight Number",
    minWidth: 170,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "aircraft",
    headerName: "Aircraft",
    minWidth: 170,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "airline",
    headerName: "Airline",
    minWidth: 170,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 170,
    headerAlign: "center",
    align: "center",
  },
];

function HomePage(props: any) {
  const navigate = useNavigate();
  const [searchLoaded, setLoaded] = useState(true);

  const [flightNum, setFlightNum] = useState("");
  const [tabelData, setTableData] = useState([{}]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!_.isNil(getCookie())) {
      const uEmail = getCurrentUser().email;
      flightService.getFlightByUemail(uEmail).then((res) => {
        setTableData(res.data);
        setIsDataLoaded(true);
      });
    } else {
      setTableData([{}]);
      setIsDataLoaded(false);
    }
  }, []);
  return (
    <>
      <div className="home-page-bg">
        <video src={bgVideo} autoPlay loop muted />
        <Box
          className="home-page_search-box"
          marginTop={-10}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          <TextField
            name="flightNumber"
            size="small"
            required
            fullWidth
            onChange={(e) => setFlightNum(e.target.value)}
            id="flightNumber"
            label="Enter flight number"
          ></TextField>

          <Button
            className="home-page_search-button"
            size="small"
            onClick={(e) => {
              if (!props.isSignIn) {
                navigate("/auth");
              } else {
                if (!_.isEmpty(flightNum)) {
                  const ticketSave = tabelData.find((item: any) => {
                    return item.number === flightNum;
                  });
                  if (!_.isUndefined(ticketSave)) {
                    props.setIsSaved(true);
                  }

                  setLoaded(false);

                  flightService.getFlight(flightNum).then((res) => {
                    console.log(res.data);
                    props.setFlightData(res.data);
                    setLoaded(true);
                    navigate("/flight");
                  });
                }
              }
            }}
            endIcon={<TravelExploreIcon />}
            sx={{ marginLeft: "5px" }}
            color="info"
            variant="contained"
          >
            Search
          </Button>
        </Box>
        {!searchLoaded && (
          <Box
            sx={{
              ml: "25%",
              width: "50%",
            }}
          >
            <LinearProgress />
          </Box>
        )}
        {props.isSignIn ? (
          <>
            <h3 style={{ margin: "1rem" }}>My Flights</h3>
            <div
              style={{
                marginTop: "3rem",
                height: 400,
                width: "100%",
              }}
            >
              {isDataLoaded ? (
                <DataGrid
                  onRowClick={(e) => {
                    const flightNum = e.row.number;
                    if (!_.isUndefined(flightNum)) {
                      flightService
                        .getFlightByFlightNum(flightNum)
                        .then((res) => {
                          props.setFlightData(res.data);
                          props.setIsSaved(true);
                          navigate("/flight");
                        });
                    }
                  }}
                  hideFooterSelectedRowCount
                  rows={tabelData}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              ) : (
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                  <CircularProgress size="4rem" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ height: 150 }}></div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
