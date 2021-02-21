import { createContext, useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

interface User {
  id: string;
  name: string;
  email?: string;
}

export const UserContext = createContext<User>({ id: "", name: "", email: "" });

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

const User: React.FC = (props) => {
  const [currentUser, setCurrentUser] = useState<User>({ id: "", name: "" });
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  // todo redirect home if there is no user
  useEffect(() => {
    if (error) {
      setCurrentUser({ id: "", name: "", email: "" });
    }
    if (data?.currentUser) {
      setCurrentUser(data.currentUser);
    }
  }, [data]);
  return (
    <UserContext.Provider value={currentUser}>
      {props.children}
    </UserContext.Provider>
  );
};

export default User;
