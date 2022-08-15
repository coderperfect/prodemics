import { authoritiesActions } from "./authorities-slice";
import { decodeToken, isTokenValid } from "../util/token";

export const fetchAuthorities = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token !== null && isTokenValid(token)) {
      const decodedToken = decodeToken(token);
      const authorities = decodedToken.authorities;

      dispatch(authoritiesActions.setAuthorities(authorities));
    }
  };
};
