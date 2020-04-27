import { useForm } from ".";
import axios from "../../axios";
import { Api } from "../../types/api";

export const useUpdateUserForm = (user: Api.User) => {
  return useForm<
    { name: string; email: string; password: ""; admin: boolean },
    Api.User
  >(
    {
      name: user.displayName || "",
      email: user.email || "",
      password: "",
      admin: user.customClaims?.admin || false,
    },
    async (values) => {
      const { data } = await axios.put<{ user: Api.User }>(
        `users/${user.uid}`,
        {
          ...values,
          // Set admin value to undefined if unchanged
          admin:
            values.admin === user.customClaims?.admin
              ? undefined
              : values.admin,
        }
      );
      return data.user;
    },
    (values) => {
      return (
        values.email.includes("@") &&
        (values.password.length === 0 || values.password.length > 5)
      );
    }
  );
};
