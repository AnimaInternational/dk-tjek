import {
  faUserEdit,
  faUserPlus,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CreateUserModal } from "../../components/CreateUserModal";
import { useFetch } from "../../hooks/useFetch";
import { StyledAdminPage } from "./style";
import { Overlay } from "../../components/Overlay";
import { UpdateUserModal } from "../../components/UpdateUserModal";
import { StyledIconButton } from "../../styles/styled/StyledIconButton";
import { Api } from "../../types/api";

interface AdminPageProps {}

export const AdminPage: React.FC<AdminPageProps> = ({ children, ...props }) => {
  const [users, setUsers] = useState<Api.User[] | undefined>();
  const [copiedTokenUser, setCopiedTokenUser] = useState<
    Api.User | undefined
  >();
  const [updateUser, setUpdateUser] = useState<Api.User | undefined>();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const { error, loading, data } = useFetch<{ users?: Api.User[] }>("/users", {
    method: "GET",
  });

  useEffect(() => {
    setUsers(data?.users || undefined);
  }, [data]);

  const handleEditUser = async (user: Api.User) => {
    setUpdateUser(user);
  };

  const handleCopyUserToken = async (user: Api.User) => {
    navigator.clipboard.writeText(user.salesforceToken);
    setCopiedTokenUser(user);
  };

  const handleUserCreated = (user: Api.User) => {
    setUsers((state) => (state ? [...state, user] : [user]));
    setShowCreateUserModal(false);
  };

  const handleUserUpdated = (user: Api.User) => {
    setUsers((state) =>
      state?.map((a) => {
        if (user.uid === a.uid) {
          return user;
        }
        return a;
      })
    );
    setUpdateUser(undefined);
  };

  const handleUserDeleted = () => {
    setUsers((state) =>
      state ? state.filter((a) => a.uid !== updateUser!.uid) : []
    );
    setUpdateUser(undefined);
  };

  return (
    <StyledAdminPage>
      <main>
        <div className="header">
          <h2>Manage users</h2>
          <StyledIconButton onClick={() => setShowCreateUserModal(true)}>
            <FontAwesomeIcon icon={faUserPlus} />
          </StyledIconButton>
        </div>
        {copiedTokenUser && (
          <p>
            <i>
              {copiedTokenUser.displayName || copiedTokenUser.email}'s token
              copied to clipboard!
              <br />
              User will authenticate to Salesforce with that token preceded by
              Bearer (i.e. "AuthorizationToken": "Bearer eyKernwkl...")
            </i>
          </p>
        )}
        {loading ? <p>Loading...</p> : null}
        {error ? <p className="error">{error.message}</p> : null}
        {users ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Last signed in</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.displayName || "–"}</td>
                  <td className={user.customClaims?.admin ? "admin" : ""}>
                    {user.email}
                  </td>
                  <td>{user.metadata.creationTime}</td>
                  <td>{user.metadata.lastSignInTime || "–"}</td>
                  <td className="actions">
                    {user.salesforceToken && (
                      <StyledIconButton
                        title={user.salesforceToken}
                        onClick={() => handleCopyUserToken(user)}
                      >
                        <FontAwesomeIcon icon={faClipboard} />
                      </StyledIconButton>
                    )}
                    <StyledIconButton onClick={() => handleEditUser(user)}>
                      <FontAwesomeIcon icon={faUserEdit} />
                    </StyledIconButton>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={100}>
                  <p>{`${users.length || "No"} results`}</p>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : null}
      </main>
      {showCreateUserModal ? (
        <Overlay>
          <CreateUserModal
            onUserCreated={handleUserCreated}
            onClose={() => setShowCreateUserModal(false)}
          />
        </Overlay>
      ) : null}
      {updateUser ? (
        <Overlay>
          <UpdateUserModal
            user={updateUser}
            onUserUpdated={handleUserUpdated}
            onUserDeleted={handleUserDeleted}
            onClose={() => setUpdateUser(undefined)}
          />
        </Overlay>
      ) : null}
    </StyledAdminPage>
  );
};
