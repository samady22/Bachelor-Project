import { CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import _ from "lodash";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { getCookie } from "../../services/authenticate";
import flightService from "../../services/flightService";

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

const AllFlightsPage = () => {
  const [tabelData, setTableData] = useState([{}]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!_.isNil(getCookie())) {
      flightService.getAllFlights().then((res) => {
        setTableData(res.data);
        setIsDataLoaded(true);
      });
    } else {
      setTableData([{}]);
      setIsDataLoaded(false);
    }
  }, []);
  return (
    <div style={{ marginTop: "80px", height: "80vh" }}>
      <h3 style={{ margin: "0.5rem" }}>All saved flights</h3>

      {isDataLoaded ? (
        <DataGrid
          style={{ marginTop: "5%" }}
          hideFooterSelectedRowCount
          rows={tabelData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        <div style={{ textAlign: "center", marginTop: "10%", height: "70vh" }}>
          <CircularProgress size="5rem" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AllFlightsPage;
