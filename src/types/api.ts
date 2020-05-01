export namespace Api {
  export interface User extends firebase.User {
    salesforceToken: string;
    customClaims?: {
      admin?: boolean;
    };
  }

  export type Subscription = {
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
}
