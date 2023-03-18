import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SignInPage from "./content/AuthPage/SignInPage";
import Navbar from "./components/Header/Navbar";
import HomePage from "./content/HomePage/HomePage";
import { useState } from "react";
import { getCookie } from "./services/authenticate";
import _ from "lodash";
import React from "react";
import FlightDetailPage from "./content/FlightDetailPage/FlightDetailPage";
import AllFlightsPage from "./content/AllFlightPage/AllFlightsPage";
import SharedFilghtPage from "./content/FlightDetailPage/SharedFlight";

function App() {
  const navigate = useNavigate();
  const theme = createTheme();
  const [isSignIn, setIsSignIn] = useState(false);
  const [flightData, setFlightData] = useState([{}]);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    if (!_.isNil(getCookie())) {
      setIsSignIn(true);
    } else {
      navigate("/auth");
      setIsSignIn(false);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar isSignIn={isSignIn} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setIsSaved={setIsSaved}
                isSignIn={isSignIn}
                setFlightData={setFlightData}
              />
            }
          />
          <Route
            path="/auth"
            element={<SignInPage setIsSignIn={setIsSignIn} />}
          />
          <Route path="/allflights" element={<AllFlightsPage />} />
          <Route
            path="/flight"
            element={
              <FlightDetailPage
                isSaved={isSaved}
                setIsSaved={setIsSaved}
                flightData={flightData}
              />
            }
          />
          <Route
            path="/flight/share"
            element={
              <SharedFilghtPage isSaved={isSaved} setIsSaved={setIsSaved} />
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
