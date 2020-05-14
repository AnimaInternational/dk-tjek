import { useForm } from ".";
import axios from "../../axios";
import { Api } from "../../types/api";

export type QueryType = "email" | "phone" | "street";

export const useSearchForm = () => {
  return useForm<
    {
      selectedType: QueryType | null;
      probableType: QueryType | null;
      value: string;
    },
    Api.Subscription[]
  >(
    { selectedType: null, probableType: null, value: "" },
    async (values) => {
      const { data } = await axios.post<{ subscriptions: Api.Subscription[] }>(
        "subscriptions",
        { [values.selectedType || values.probableType!]: values.value }
      );
      return data.subscriptions;
    },
    (values) => {
      switch (values.selectedType || values.probableType!) {
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
