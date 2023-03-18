import { Button, CircularProgress, Paper } from "@mui/material";
import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Map from "../../components/Map/GoogleMap";
import PlacesList from "../../components/PlacesList/PlacesList";
import { getCurrentUser } from "../../services/authenticate";
import flightService from "../../services/flightService";
import placeService from "../../services/placeService";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import "../FlightDetailPage/FlightPage.css";
import ShareLinkModal from "../../components/Modal/ShareLinkModal";
import { v4 as uuidv4 } from "uuid";
const countryListTwoAlph: any = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas (the)",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia (Plurinational State of)",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory (the)",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  CV: "Cabo Verde",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  KY: "Cayman Islands (the)",
  CF: "Central African Republic (the)",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands (the)",
  CO: "Colombia",
  KM: "Comoros (the)",
  CD: "Congo (the Democratic Republic of the)",
  CG: "Congo (the)",
  CK: "Cook Islands (the)",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czechia",
  CI: "Côte d'Ivoire",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic (the)",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FK: "Falkland Islands (the) [Malvinas]",
  FO: "Faroe Islands (the)",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories (the)",
  GA: "Gabon",
  GM: "Gambia (the)",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and McDonald Islands",
  VA: "Holy See (the)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea (the Democratic People's Republic of)",
  KR: "Korea (the Republic of)",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic (the)",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands (the)",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States of)",
  MD: "Moldova (the Republic of)",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands (the)",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger (the)",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands (the)",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines (the)",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  MK: "Republic of North Macedonia",
  RO: "Romania",
  RU: "Russian Federation (the)",
  RW: "Rwanda",
  RE: "Réunion",
  BL: "Saint Barthélemy",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin (French part)",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten (Dutch part)",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan (the)",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands (the)",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates (the)",
  GB: "United Kingdom of Great Britain and Northern Ireland (the)",
  UM: "United States Minor Outlying Islands (the)",
  US: "United States of America (the)",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela (Bolivarian Republic of)",
  VN: "Viet Nam",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  AX: "Åland Islands",
};
const FlightDetailPage = (props: any) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [places, setPlaces] = useState<any>(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nearLoactionType, setNearType] = useState("restaurants");
  const [openModal, setOpenModal] = useState(false);

  const [bounds, setBounds] = useState<any>(null);

  useEffect(() => {
    if (!_.isNil(bounds)) {
      const boundData = {
        nearLoactionType: nearLoactionType,
        boundSW: bounds.sw,
        boundNE: bounds.ne,
      };
      setIsLoaded(true);
      placeService.getPlaces(boundData).then((res) => {
        setPlaces(res.data);
        setIsLoaded(false);
      });
    }
  }, [nearLoactionType, bounds]);

  const saveHandler = () => {
    if (!_.isEmpty(props.flightData[0])) {
      const data = {
        number: props.flightData[0]?.number,
        share_id: uuidv4(),
        user_id: getCurrentUser().id,
        user: getCurrentUser(),
        status: props.flightData[0]?.status,
        aircraft: props.flightData[0]?.aircraft,
        greatCircleDistance: !_.isUndefined(
          props.flightData[0].greatCircleDistance
        )
          ? props.flightData[0]?.greatCircleDistance
          : {},
        airline: props.flightData[0]?.airline,
        departure: props.flightData[0]?.departure,
        arrival: props.flightData[0]?.arrival,
      };

      flightService.saveFlight(data).then((res) => {
        if (res.statusCode === 200) {
          props.setIsSaved(true);
        } else {
          props.setIsSaved(true);
          setErrMsg(res.message);
        }
      });
    }
  };
  const cancelHandler = () => {
    props.setIsSaved(false);
    navigate("/");
  };

  const deleteHandler = () => {
    flightService.deleteFlights(props?.flightData[0]?.share_id).then((res) => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  };
  return (
    <div>
      <div style={{ margin: "10px", marginTop: "90px" }}>
        {!_.isEmpty(props.flightData[0]) ? (
          <>
            <ShareLinkModal
              flight={props.flightData[0]}
              open={openModal}
              setOpen={setOpenModal}
            />

            <h3
              style={{ margin: "1rem" }}
            >{`Flight ${props.flightData[0]?.number} Details`}</h3>

            <Paper
              className="flight-detail-detail-box"
              sx={{
                borderRadius: "0.5rem",
                margin: "auto",
                backgroundColor: "#f0f0f0",
                padding: "10px",
              }}
            >
              <div style={{ paddingLeft: "5px" }}>
                <span style={{ fontSize: "0.8rem" }}>
                  <b>Status: </b>
                </span>
                <span style={{ fontSize: "0.8rem", color: "purple" }}>
                  {props.flightData[0].status}
                </span>
              </div>
              <hr></hr>
              <div className="flight-detail_aircraft">
                <h5
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    backgroundColor: "#9c27b0",
                    color: "white",
                  }}
                >
                  Flight
                </h5>
                <p style={{ fontSize: "0.8rem" }}>
                  <b>Flight Number: </b> {props.flightData[0]?.number}
                </p>
                <p style={{ fontSize: "0.8rem" }}>
                  <b>Aircraft Model: </b>
                  {props.flightData[0].aircraft?.model}
                </p>
                <p style={{ fontSize: "0.8rem" }}>
                  <b>Airline: </b> {props.flightData[0]?.airline?.name}
                </p>{" "}
                <p style={{ fontSize: "0.8rem" }}>
                  <b>Great Circle Distance: </b>
                  {props.flightData[0]?.greatCircleDistance?.km}
                </p>
              </div>
              <div className="flight-detail_arival-departure">
                <div className="flight-detail_arival-departure_child">
                  <h5
                    style={{
                      textAlign: "center",
                      backgroundColor: "#9c27b0",
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    Origin
                  </h5>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Country: </b>{" "}
                    {
                      countryListTwoAlph[
                        props.flightData[0].departure?.airport?.countryCode
                      ]
                    }
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Airport: </b>
                    {props.flightData[0].departure?.airport?.name}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Scheduled Time: </b>{" "}
                    {props.flightData[0].departure?.scheduledTimeLocal}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Gate: </b>{" "}
                    {props.flightData[0].departure?.gate
                      ? props.flightData[0].departure.gate
                      : "-"}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Terminal: </b>{" "}
                    {props.flightData[0].departure?.terminal
                      ? props.flightData[0].departure.terminal
                      : "-"}
                  </p>
                </div>
                <div className="flight-detail_arival-departure_child">
                  <h5
                    style={{
                      textAlign: "center",
                      backgroundColor: "#9c27b0",
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    Destination
                  </h5>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Country: </b>{" "}
                    {
                      countryListTwoAlph[
                        props.flightData[0].arrival?.airport?.countryCode
                      ]
                    }
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Airport: </b>
                    {props.flightData[0].arrival?.airport?.name}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Scheduled Time: </b>{" "}
                    {props.flightData[0].arrival?.scheduledTimeLocal}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Delay: </b>{" "}
                    {props.flightData[0].arrival?.scheduledTimeLocal}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Gate: </b>{" "}
                    {props.flightData[0].arrival?.gate
                      ? props.flightData[0].arrival.gate
                      : "-"}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    <b>Terminal: </b>{" "}
                    {props.flightData[0].arrival?.terminal
                      ? props.flightData[0].arrival.terminal
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flight-detail_buttons">
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  fullWidth
                  onClick={cancelHandler}
                >
                  Search Another Flight
                </Button>
                {!props.isSaved ? (
                  <Button
                    variant="outlined"
                    color="success"
                    fullWidth
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={saveHandler}
                    disabled={props.isSaved}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      color="error"
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={deleteHandler}
                    >
                      Delete
                    </Button>
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        // setOpenModal(true);
                        navigator
                          .share({
                            title: "Flight Tracker",
                            text: `Flight '${props.flightData[0]?.number}' link`,
                            url: `http://localhost:3000/flight/share/?share_id=${props.flightData[0]?.share_id}`,
                          })
                          .catch(console.error);
                      }}
                      startIcon={<ShareIcon />}
                      color="inherit"
                    >
                      Share
                    </Button>
                  </>
                )}
              </div>

              {!_.isEmpty(errMsg) && (
                <div className="flight-detail__err-msg">
                  <p
                    style={{
                      textAlign: "center",
                      color: "darkred",
                      fontSize: "0.8rem",
                    }}
                  >
                    {errMsg}
                  </p>
                </div>
              )}
              <div className="flight-detail_place-map">
                <div className="listDetail flight-detail_place-map_child1">
                  {!_.isNil(places) ? (
                    <PlacesList
                      places={places}
                      childClicked={childClicked}
                      isLoaded={isLoaded}
                      setChildClicked={setChildClicked}
                      nearLoactionType={nearLoactionType}
                      setNearType={setNearType}
                    />
                  ) : (
                    <div style={{ textAlign: "center", marginTop: "40%" }}>
                      <CircularProgress size="5rem" />
                    </div>
                  )}
                </div>
                <div className="flight-detail_place-map_child2">
                  <Map
                    coords={{
                      lat: props.flightData[0].arrival?.airport?.location?.lat,
                      lng: props.flightData[0].arrival?.airport?.location?.lon,
                    }}
                    places={places}
                    setChildClicked={setChildClicked}
                    setBounds={setBounds}
                  />
                </div>
              </div>
            </Paper>
          </>
        ) : (
          <Paper
            className="flight-detail-detail-box"
            sx={{
              textAlign: "center",
              borderRadius: "0.5rem",
              margin: "auto",
              backgroundColor: "#CBC3E3",
              height: "80vh",
            }}
          >
            No flight data
          </Paper>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FlightDetailPage;
