import { useEffect, useState } from "react";
import flightService from "../../services/flightService";
import FlightDetailPage from "./FlightDetailPage";

const SharedFilghtPage = (props: any) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const share_id = queryParameters.get("share_id");
  const [flightData, setFlightData] = useState([{}]);

  useEffect(() => {
    flightService.getSharedFlight(share_id).then((res) => {
      setFlightData(res.data);
    });
  }, []);
  return (
    <>
      {
        <FlightDetailPage
          flightData={flightData}
          isSaved={props.isSaved}
          setIsSaved={props.setIsSaved}
        />
      }
    </>
  );
};

export default SharedFilghtPage;
