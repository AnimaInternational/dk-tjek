import { useForm } from ".";
import { useAppState } from "../../state";

export const useLoginForm = () => {
  const { signIn } = useAppState();

  return useForm<{ email: string; password: string }, any>(
    { email: "", password: "" },
    async (values) => signIn(values.email, values.password)
  );
};
