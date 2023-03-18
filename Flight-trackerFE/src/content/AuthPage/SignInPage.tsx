import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Link,
  Container,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import "./SignUpPage.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import authService from "../../services/authService";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import _ from "lodash";

let currentUser: any;
export function getCurrentUser() {
  return currentUser;
}

function SignInPage(props: any) {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<{ [key: string]: any }>({});
  const [passwordErr, setPasswordErr] = useState("");
  const [validation, setValidation] = useState<{
    name: boolean;
    last_name: boolean;
    email: boolean;
    password: boolean;
  }>({ name: false, last_name: false, email: false, password: false });
  const [targetName, setTargetName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const validationFunction = (trgName: string) => {
    if (trgName !== "") {
      if (
        !isSignInPage &&
        (!passwordValidation(trgName, userData[trgName]) ||
          !isValidEmail(trgName, userData[trgName]) ||
          userData[trgName] === "" ||
          userData[trgName] === undefined)
      ) {
        setValidation({ ...validation, [trgName]: true });
        return false;
      } else {
        setValidation({ ...validation, [trgName]: false });
        return true;
      }
    }
  };

  useEffect(() => {
    validationFunction(targetName);
  }, [userData]);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setTargetName(name);
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  function isValidEmail(key: string, email: any) {
    if (key === "email") {
      return /\S+@\S+\.\S+/.test(email);
    } else {
      return true;
    }
  }

  function passwordValidation(key: string, passwordInputValue: any) {
    if (key === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const minLengthRegExp = /.{8,}/;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordInputValue === "" || passwordInputValue === undefined) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
        return true;
      }
      setPasswordErr(errMsg);
      return false;
    } else {
      return true;
    }
  }

  const showPassHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!validationFunction("email") || !validationFunction("password")) {
      return;
    }
    if (isSignInPage) {
      authService.signIn(userData).then((res: any) => {
        if (!_.isEqual(res.data.status, 200)) {
          setErrMsg("Please check your credentials");
        } else {
          setErrMsg("");
          window.location.href = "/";
        }
      });
    } else {
      if (!validationFunction("name") || !validationFunction("last_name")) {
        return;
      }
      authService.signUp(userData).then((res) => {
        if (_.isEqual(res.data.status, 201)) {
          setErrMsg("");
          setIsSignInPage(!isSignInPage);
        } else {
          setErrMsg("Please use another email");
        }
      });
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {!isSignInPage ? "Sign up" : "Sign in"}
          </Typography>
          <Box id="signinForm" component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {!isSignInPage && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={onChangeHandler}
                      name="name"
                      required
                      helperText={validation.name ? "Fill in required" : ""}
                      error={validation.name}
                      fullWidth
                      value={userData.name ? userData.name : ""}
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={onChangeHandler}
                      required
                      fullWidth
                      value={userData.last_name ? userData.last_name : ""}
                      id="last_name"
                      helperText={
                        validation.last_name ? "Fill in required" : ""
                      }
                      label="Last Name"
                      name="last_name"
                      error={validation.last_name}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userData.email ? userData.email : ""}
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={onChangeHandler}
                  helperText={validation.email ? "Not valid email" : ""}
                  error={validation.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    onChange={onChangeHandler}
                    error={validation.password}
                    value={userData.password ? userData.password : ""}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={showPassHandler} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    name="password"
                    label="Password"
                  />
                </FormControl>
                {validation.password ? (
                  <span className="text-danger">{passwordErr}</span>
                ) : (
                  ""
                )}
              </Grid>
              {<span className="not--found">{errMsg}</span>}
            </Grid>
            <Typography align="center">
              <Button
                color="warning"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                size="small"
                type="submit"
                onClick={submitHandler}
              >
                {!isSignInPage ? "Sign up" : "Sign in"}
              </Button>
            </Typography>

            <Grid container justifyContent="center">
              {!isSignInPage ? (
                <Grid item>
                  Already have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => {
                      setErrMsg("");
                      setUserData({});
                      setIsSignInPage(!isSignInPage);
                    }}
                    variant="body2"
                  >
                    Sign in
                  </Link>
                </Grid>
              ) : (
                <Grid item>
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => {
                      setErrMsg("");
                      setUserData({});
                      setIsSignInPage(!isSignInPage);
                    }}
                    variant="body2"
                  >
                    {"Sign Up"}
                  </Link>
                </Grid>
              )}
            </Grid>

            {isSignInPage && (
              <>
                <div className="separator-line"></div>
                <Typography align="center">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      mt: 1,
                      mb: 1,
                      backgroundColor: "#dd4b39",
                      color: "white",
                    }}
                    onClick={() => {
                      window.location.href =
                        "http://localhost:4000/api/auth/google";
                    }}
                  >
                    <GoogleIcon sx={{ marginLeft: "5px", mr: "7px" }} /> Sign in
                    with Google+
                  </Button>
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignInPage;
