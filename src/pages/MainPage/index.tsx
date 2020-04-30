import React, { FormEvent, useEffect, useState } from "react";
import { QueryType, useSearchForm } from "../../hooks/useForm/useSearchForm";
import { Api } from "../../types/api";
import { StyledMainPage } from "./style";

export const MainPage: React.FC = ({ children, ...props }) => {
  const [subscriptions, setSubscriptions] = useState<
    (Api.Subscription & { index: number })[] | null
  >(null);
  const [lastSubmission, setLastSubmission] = useState<string | null>(null);
  const {
    error,
    loading,
    valid,
    values,
    handleSubmit,
    handleInputChange,
    setValues,
  } = useSearchForm();

  const handleFormSubmit = async (event: FormEvent) => {
    const submittedValue = values.value;
    const result = await handleSubmit(event);
    setLastSubmission(submittedValue);
    setSubscriptions(result.map((a, i) => ({ ...a, index: i })));
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

  const getQueryTypeInputPlaceholder = (
    type: QueryType
  ): HTMLInputElement["placeholder"] => {
    switch (type) {
      case "email":
        return "account email";
      case "phone":
        return "only 8 digits";
      case "street":
        return "billing street, e.g. Hans Tavsens Gade 8";
    }
  };

  const getStatusLevel = (status: string): "success" | "warning" | "danger" => {
    if (status === "Active") return "success";
    if (status === "Pending") return "warning";
    return "danger";
  };

  return (
    <StyledMainPage>
      <main>
        <h2>Search subscriptions</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="search-bar">
            <select
              name="type"
              value={values.type}
              onChange={handleInputChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="street">Address</option>
            </select>
            <label>
              <input
                type={getQueryTypeInputType(values.type)}
                placeholder={getQueryTypeInputPlaceholder(values.type)}
                name="value"
                onChange={handleInputChange}
                value={values.value}
              />
            </label>
            <button type="submit" disabled={loading || !valid}>
              Search
            </button>
          </div>
          {error && <p className="error">{error.message}</p>}
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
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Record type</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Account name</th>
                      <th>Amount (DKK)</th>
                      <th>Frequency</th>
                      <th>Billing street</th>
                      <th>Billing postal code</th>
                      <th>Billing city</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr
                        key={subscription.index}
                        className={getStatusLevel(subscription.status)}
                        title={subscription.status}
                      >
                        <td>{subscription.recordType || "–"}</td>
                        <td>{subscription.startDate || "–"}</td>
                        <td>{subscription.endDate || "–"}</td>
                        <td>{subscription.accountName || "–"}</td>
                        <td>{subscription.amount || "–"}</td>
                        <td>{subscription.frequency || "–"}</td>
                        <td>{subscription.billing.street || "–"}</td>
                        <td>{subscription.billing.postalCode || "–"}</td>
                        <td>{subscription.billing.city || "–"}</td>
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
              </div>
            </>
          )}
        </section>
      </main>
    </StyledMainPage>
  );
};
