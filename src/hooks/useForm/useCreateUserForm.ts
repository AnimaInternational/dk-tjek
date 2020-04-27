import { useForm } from ".";
import axios from "../../axios";
import { Api } from "../../types/api";

export const useCreateUserForm = () => {
  return useForm<{ name: string; email: string; password: string }, Api.User>(
    { name: "", email: "", password: "" },
    async (values) => {
      const { data } = await axios.post<{ user: Api.User }>("users", values);
      return data.user;
    },
    (values) => {
      return values.email.includes("@") && values.password.length > 5;
    }
  );
};
