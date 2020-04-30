import { NetlifyEvent, NetlifyContext, NetlifyHandler } from "./types/netlify";

export class NetlifyError extends Error {
  public isNetlify = true;
  constructor(public statusCode: number, public message: string) {
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
          body: e.message,
          statusCode: e.statusCode,
        };
      } else {
        return {
          body: "Internal server error",
          statusCode: 500,
        };
      }
    }
  };
};
