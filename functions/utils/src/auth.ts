import { firebaseAuth } from "./firebase";
import { NetlifyError } from "./netlify";
import { NetlifyEvent } from "./types/netlify";

const getAuthTokenFromHeaders = (
  headers?: Record<string, string>
): string | undefined => {
  const authHeader = headers?.authorization;
  return authHeader ? authHeader.split("Bearer ")[1] : undefined;
};

const verifyToken = async (
  token?: string
): Promise<{ uid: string; admin?: boolean }> => {
  try {
    if (!token) throw new NetlifyError(401, "Authentication failed");
    const claims = await firebaseAuth.verifyIdToken(token, true);
    return { uid: claims.uid, admin: claims.admin };
  } catch (e) {
    if (e.code === "auth/id-token-revoked") {
      throw new NetlifyError(401, "Token has been revoked");
    } else {
      throw new NetlifyError(401, "Authentication failed");
    }
  }
};

export const authorizeUser = async (event: NetlifyEvent): Promise<void> => {
  await verifyToken(getAuthTokenFromHeaders(event.headers));
};

export const authorizeAdmin = async (event: NetlifyEvent): Promise<void> => {
  const { admin } = await verifyToken(getAuthTokenFromHeaders(event.headers));
  if (!admin) throw new NetlifyError(401, "Admins only");
};
