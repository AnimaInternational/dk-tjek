import {
  authorizeAdmin,
  firebaseAuth,
  NetlifyError,
  netlifyHandler,
  NetlifyHandler,
  getUserSalesforceToken,
} from "utils";

const getUsers = async () => {
  const { users } = await firebaseAuth.listUsers(1000);
  return {
    statusCode: 200,
    body: {
      users: users.map((u) => ({
        ...u,
        salesforceToken: getUserSalesforceToken(u.uid, process.env.JWT_SECRET!),
      })),
    },
  };
};

const createUser = async (data: {
  email: string;
  password: string;
  displayName?: string;
  phoneNumber?: string;
}) => {
  const user = await firebaseAuth.createUser(data);
  return {
    statusCode: 201,
    body: {
      user: {
        ...user,
        salesforceToken: getUserSalesforceToken(
          user.uid,
          process.env.JWT_SECRET!
        ),
      },
    },
  };
};

const updateUser = async (
  uid: string,
  data: {
    email?: string;
    password?: string;
    displayName?: string;
    phoneNumber?: string;
    admin?: boolean;
  }
) => {
  const { admin, ...userData } = data;
  if (admin !== undefined) {
    await firebaseAuth.setCustomUserClaims(uid, { admin });
  }
  const user = await firebaseAuth.updateUser(uid, userData);
  return {
    statusCode: 200,
    body: {
      user: {
        ...user,
        salesforceToken: getUserSalesforceToken(
          user.uid,
          process.env.JWT_SECRET!
        ),
      },
    },
  };
};

const deleteUser = async (uid: string) => {
  await firebaseAuth.deleteUser(uid);
  return {
    statusCode: 200,
    body: { uid },
  };
};

export const handler: NetlifyHandler = netlifyHandler(
  async (event, context) => {
    switch (event.httpMethod) {
      case "GET": {
        await authorizeAdmin(event);
        return getUsers();
      }
      case "POST": {
        await authorizeAdmin(event);
        const body = JSON.parse(event.body);
        return createUser({
          email: body.email,
          password: body.password,
          displayName: body.name,
          phoneNumber: body.phoneNumber,
        });
      }
      case "PUT": {
        await authorizeAdmin(event);
        const body = JSON.parse(event.body);
        // TODO: use regex instead
        const uid = event.path.split("users/").pop()?.split("?").shift();
        if (!uid) throw new NetlifyError(400, "Provide uid in request URL");
        const password = body.password.length > 0 ? body.password : undefined;
        return updateUser(uid, {
          email: body.email,
          password,
          displayName: body.name,
          phoneNumber: body.phoneNumber,
          admin: body.admin,
        });
      }
      case "DELETE": {
        await authorizeAdmin(event);
        // TODO: use regex instead
        const uid = event.path.split("users/").pop()?.split("?").shift();
        if (!uid) throw new NetlifyError(400, "Provide uid in request URL");
        return deleteUser(uid);
      }
      default: {
        throw new NetlifyError(405, "Method Not Allowed");
      }
    }
  }
);
