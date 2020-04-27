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
    }
  );
};
