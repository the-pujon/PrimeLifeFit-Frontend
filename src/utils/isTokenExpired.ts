import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: null | string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return (decodedToken.exp as number) < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
