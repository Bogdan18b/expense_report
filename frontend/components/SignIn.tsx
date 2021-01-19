import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ variables: { email, password } });
    setEmail("");
    setPassword("");
  };

  const isSubmitDisabled = [email, password].includes("");

  return (
    <form>
      <fieldset>
        <h2>Sign In</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={updateEmail}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={updatePassword}
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </fieldset>
    </form>
  );
};

export default SignIn;
