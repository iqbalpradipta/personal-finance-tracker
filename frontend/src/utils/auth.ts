import { jwtDecode, JwtPayload } from "jwt-decode";

export function parseAndValidateToken(token: string | null): JwtPayload | null {
  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode or validate token:", error);
    return null;
  }
}