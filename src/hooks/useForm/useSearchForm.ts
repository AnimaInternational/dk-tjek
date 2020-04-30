import { useForm } from ".";
import axios from "../../axios";
import { Api } from "../../types/api";

export type QueryType = "email" | "phone" | "street";

export const useSearchForm = () => {
  return useForm<{ type: QueryType; value: string }, Api.Subscription[]>(
    { type: "email", value: "" },
    async (values) => {
      const { data } = await axios.post<{ subscriptions: Api.Subscription[] }>(
        "subscriptions",
        { [values.type]: values.value }
      );
      return data.subscriptions;
    },
    (values) => {
      switch (values.type) {
        case "email":
          return values.value.includes("@") && values.value.length > 3;
        case "phone":
          return /^\d{8}$/.test(values.value);
        case "street":
          return values.value.length > 3;
        default:
          return false;
      }
    }
  );
};
