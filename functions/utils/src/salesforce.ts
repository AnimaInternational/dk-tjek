import jwt from "jsonwebtoken";

export const getUserSalesforceToken = (uid: string, secret: string) => {
  return jwt.sign({ uid }, secret, { noTimestamp: true });
};
