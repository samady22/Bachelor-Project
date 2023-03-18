import * as _ from "lodash";
import jwtDecode, { JwtPayload } from "jwt-decode";
let currentUser: any;
const cookieName = "flight";

export function getCookie() {
  const decodedCookie: string = decodeURIComponent(document.cookie);
  const pairs: Array<string> = decodedCookie.split(/;\s*/);
  for (const pair of pairs) {
    if (pair.includes(cookieName)) {
      return pair.substring(cookieName.length).split("=")[1];
    }
  }
  console.warn("Cookie is empty.");
  return null;
}

export function getCurrentUser() {
  return currentUser;
}

export function Authenticate() {
  const token = getCookie();
  if (!_.isNil(token)) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      currentUser = decoded;
      return "success";
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
}
