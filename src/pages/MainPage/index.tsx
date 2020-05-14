import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { QueryType, useSearchForm } from "../../hooks/useForm/useSearchForm";
import { Api } from "../../types/api";
import { StyledMainPage } from "./style";

type IndexedSubscription = Api.Subscription & { index: number };

export const MainPage: React.FC = ({ children, ...props }) => {
  const [subscriptions, setSubscriptions] = useState<
    IndexedSubscription[] | null
  >(null);
  const [lastSubmission, setLastSubmission] = useState<{
    type: QueryType;
    value: string;
  } | null>(null);
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
    const submittedValues = values;
    try {
      setSubscriptions(null);
      const result = await handleSubmit(event);
      const indexedSubscriptions = result
        .map((a, i) => ({ ...a, index: i }))
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      const { active, pending, other } = indexedSubscriptions.reduce<{
        active: IndexedSubscription[];
        pending: IndexedSubscription[];
        other: IndexedSubscription[];
      }>(
        (res, subscription) => {
          switch (subscription.status) {
            case "Active":
              res.active.push(subscription);
              break;
            case "Pending":
              res.pending.push(subscription);
              break;
            default:
              res.other.push(subscription);
              break;
          }
          return res;
        },
        { active: [], pending: [], other: [] }
      );
      setSubscriptions([...active, ...pending, ...other]);
    } finally {
      setLastSubmission({
        value: submittedValues.value,
        type: submittedValues.selectedType || submittedValues.probableType!,
      });
    }
  };

  const getQueryTypeHelp = (type: QueryType | null): string => {
    switch (type) {
      case "email":
        return "Enter account email";
      case "phone":
        return "Enter phone number (8 digits)";
      case "street":
        return "Enter billing street (e.g. Hans Tavsens Gade 8)";
      default:
        return "Enter email, phone or address";
    }
  };

  const getProbableType = useCallback((value: string): QueryType | null => {
    if (new RegExp(/(^\d+$)/).test(value)) return "phone";
    if (new RegExp(/(@|.com|.dk)/).test(value)) return "email";
    if (new RegExp(/(\s|vei|\w+\s\d+)/).test(value)) return "street";
    return null;
  }, []);

  useEffect(() => {
    setValues((state) => ({
      ...state,
      selectedType: values.value ? state.selectedType : null,
      probableType: getProbableType(values.value),
    }));
  }, [getProbableType, values.value, setValues]);

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
          <p>{getQueryTypeHelp(values.selectedType || values.probableType)}</p>
          <div className="search-bar">
            <label>
              <input
                name="value"
                value={values.value}
                onChange={handleInputChange}
              />
            </label>
            <select
              name="selectedType"
              value={values.selectedType || values.probableType || undefined}
              onChange={handleInputChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="street">Address</option>
            </select>
            <button type="submit" disabled={loading || !valid}>
              Search
            </button>
          </div>
        </form>
        <section>
          {lastSubmission && (
            <div className="header">
              <h3>Results</h3>
              <p>
                ({lastSubmission.type}: {lastSubmission.value})
              </p>
            </div>
          )}
          {loading && <h3>Loading...</h3>}
          {error && <p className="error">{error.message}</p>}
          {subscriptions !== null && (
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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr
                      key={subscription.index}
                      className={getStatusLevel(subscription.status)}
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
                      <td>{subscription.status || "–"}</td>
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
          )}
        </section>
      </main>
    </StyledMainPage>
  );
};
