import { NetlifyEvent, NetlifyContext, NetlifyHandler } from "./types/netlify";

export class NetlifyError extends Error {
  public isNetlify = true;
  constructor(public statusCode: number = 500, public message: string) {
    super(message);
  }
}

export const netlifyHandler = (
  handler: (
    event: NetlifyEvent,
    context: NetlifyContext
  ) => Promise<{ body: object; statusCode: number }>
): NetlifyHandler => {
  return async (event, context) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Authorization, Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH",
      "Content-Type": "application/json",
    };
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "OK" };
    }
    try {
      const { body, statusCode } = await handler(event, context);
      return {
        body: JSON.stringify(body),
        headers,
        statusCode: statusCode || 200,
      };
    } catch (e) {
      console.log(e);
      if (e.isNetlify) {
        return {
          body: JSON.stringify({
            message: e.message,
          }),
          headers,
          statusCode: e.statusCode,
        };
      } else {
        return {
          body: JSON.stringify({
            message: "Internal server error",
          }),
          headers,
          statusCode: 500,
        };
      }
    }
  };
};
