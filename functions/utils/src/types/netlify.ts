export type NetlifyReturnType = {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
};

export type NetlifyEvent = {
  httpMethod: "GET" | "OPTIONS" | "POST" | "DELETE" | "PUT" | "PATCH";
  body: string;
  path: string;
  queryStringParameters: any;
  isBase64Encoded: boolean;
  headers?: Record<string, string>;
};

export type NetlifyContext = any;

export type NetlifyHandler = (
  event: NetlifyEvent,
  context: NetlifyContext
) => Promise<NetlifyReturnType>;
