import React, { FormEvent, useEffect, useState } from "react";
import { QueryType, useSearchForm } from "../../hooks/useForm/useSearchForm";
import { Api } from "../../types/api";
import { StyledMainPage } from "./style";

export const MainPage: React.FC = ({ children, ...props }) => {
  const [subscriptions, setSubscriptions] = useState<Api.Subscription[] | null>(
    null
  );
  const [lastSubmission, setLastSubmission] = useState<string | null>(null);
  const {
    error,
    loading,
    values,
    handleSubmit,
    handleInputChange,
    setValues,
  } = useSearchForm();

  const handleFormSubmit = async (event: FormEvent) => {
    const submittedValue = values.value;
    const result = await handleSubmit(event);
    setLastSubmission(submittedValue);
    setSubscriptions(result);
  };

  useEffect(() => {
    setValues((state) => ({
      ...state,
      value: "",
    }));
  }, [values.type, setValues]);

  const getQueryTypeInputType = (type: QueryType): HTMLInputElement["type"] => {
    switch (type) {
      case "email":
        return "email";
      case "phone":
        return "tel";
      case "street":
        return "address";
    }
  };

  return (
    <StyledMainPage>
      <main>
        <h2>Search members</h2>
        <form onSubmit={handleFormSubmit}>
          <select name="type" value={values.type} onChange={handleInputChange}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="street">Address</option>
          </select>
          <label>
            <input
              type={getQueryTypeInputType(values.type)}
              name="value"
              onChange={handleInputChange}
              value={values.value}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>
        <section>
          {subscriptions === null ? (
            loading ? (
              <h3>Loading...</h3>
            ) : null
          ) : (
            <>
              <div className="header">
                <h3>Results</h3>
                <p>{lastSubmission}</p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Record type</th>
                    <th>Status</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Account name</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                    <th>Billing street</th>
                    <th>Billing postal code</th>
                    <th>Billing city</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr>
                      <td>{subscription.recordType}</td>
                      <td>{subscription.status}</td>
                      <td>{subscription.startDate}</td>
                      <td>{subscription.endDate}</td>
                      <td>{subscription.accountName}</td>
                      <td>{subscription.amount}</td>
                      <td>{subscription.frequency}</td>
                      <td>{subscription.billing.street}</td>
                      <td>{subscription.billing.postalCode}</td>
                      <td>{subscription.billing.city}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={10}>
                      <p>{`${subscriptions.length || "No"} results`}</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </>
          )}
        </section>
      </main>
    </StyledMainPage>
  );
};
