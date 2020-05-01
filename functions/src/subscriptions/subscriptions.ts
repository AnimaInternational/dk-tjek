import {
  authorizeUser,
  NetlifyError,
  netlifyHandler,
  NetlifyHandler,
  getUserSalesforceToken,
} from "utils";
import axios from "axios";

type Subscription = {
  recordType: string;
  status: "Active" | "Pending" | "Cancelled" | "Failed" | "Mistake";
  startDate: string;
  endDate: string | null;
  accountName: string;
  amount: number;
  frequency: string;
  billing: {
    street: string;
    postalCode: string;
    city: string;
  };
};

const querySubscriptions = async (
  salesforceToken: string,
  query: {
    email?: string;
    phone?: string;
    street?: string;
  }
) => {
  const { data, status } = await axios
    .post<any[] | "">(process.env.SALESFORCE_URL!, query, {
      headers: {
        AuthorizationToken: `Bearer ${salesforceToken}`,
      },
    })
    .catch((e) => {
      const [{ errorCode, message }] = e.response.data;
      throw new NetlifyError(500, message);
    });

  console.log(status);

  const subscriptions: Subscription[] = Array.isArray(data)
    ? data.map((subscription, index) => ({
        status: subscription.status,
        startDate: subscription.startDate,
        recordType: subscription.recordType,
        frequency: subscription.frequency,
        endDate: subscription.endDate,
        billing: {
          street: subscription.billingStreet,
          postalCode: subscription.billingPostalCode,
          city: subscription.billingCity,
        },
        amount: subscription.amount,
        accountName: subscription.accountName,
      }))
    : [];

  return {
    statusCode: 200,
    body: {
      subscriptions,
    },
  };
};

export const handler: NetlifyHandler = netlifyHandler(
  async (event, context) => {
    switch (event.httpMethod) {
      case "POST": {
        const { uid } = await authorizeUser(event);
        const salesforceToken = getUserSalesforceToken(
          uid,
          process.env.JWT_SECRET!
        );
        const body = JSON.parse(event.body);
        return querySubscriptions(salesforceToken, {
          email: body.email,
          phone: body.phone,
          street: body.street,
        });
      }
      default: {
        throw new NetlifyError(405, "Method Not Allowed");
      }
    }
  }
);
