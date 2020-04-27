import { authorizeUser } from "../auth";
import { NetlifyError, netlifyHandler } from "../netlify";

const querySubscriptions = async (query: { email?: string }) => {
  return {
    statusCode: 200,
    body: {
      subscriptions: [
        {
          recordType: "QuickPay",
          status: "Active",
          startDate: "2016-03-05",
          endDate: null,
          accountName: "Mads Peter",
          amount: 450,
          frequency: "Every12Months",
          billing: {
            street: "Ved Monten 19, 3. tv.",
            postalCode: "2000",
            city: "Kobenhavn",
          },
        },
        {
          recordType: "QuickPay",
          status: "Active",
          startDate: "2016-03-05",
          endDate: null,
          accountName: "Jon Rommedahl",
          amount: 450,
          frequency: "Every12Months",
          billing: {
            street: "Ved Monten 19, 3. tv.",
            postalCode: "2000",
            city: "Kobenhavn",
          },
        },
      ],
    },
  };
};

export const handler: NetlifyHandler = netlifyHandler(
  async (event, context) => {
    switch (event.httpMethod) {
      case "POST": {
        await authorizeUser(event);
        const body = JSON.parse(event.body);
        return querySubscriptions({
          email: body.email,
        });
      }
      default: {
        throw new NetlifyError(405, "Method Not Allowed");
      }
    }
  }
);
