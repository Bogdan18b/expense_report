import { createContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const UserContext = createContext({
  currentUser: {
    name: "",
    email: "",
  },
});

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

const User: React.FC = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default User;
