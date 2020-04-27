type NetlifyReturnType = {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
};

type NetlifyEvent = {
  httpMethod: "GET" | "OPTIONS" | "POST" | "DELETE" | "PUT" | "PATCH";
  body: string;
  path: string;
  queryStringParameters: any;
  isBase64Encoded: boolean;
  headers?: Record<string, string>;
};

type NetlifyContext = any;

type NetlifyHandler = (
  event: NetlifyEvent,
  context: NetlifyContext
) => Promise<NetlifyReturnType>;
