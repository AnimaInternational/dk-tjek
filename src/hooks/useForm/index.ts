import { useState, ChangeEvent, FormEvent, useEffect } from "react";

export const useForm = <T extends Record<string, any>, R = any>(
  initialValues: T,
  submitFn: (values: T) => Promise<R>,
  validatorFn?: (values: T) => boolean
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(!validatorFn);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setValid(validatorFn ? validatorFn(values) : true);
  }, [values]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.persist();
    const { target } = event;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setValues((state) => ({
      ...state,
      [target.name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent): Promise<R> => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      return await submitFn(values);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    loading,
    valid,
    error,
    setValues,
    handleSubmit,
    handleInputChange,
  };
};
