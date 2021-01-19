import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signUp(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useMutation(SIGN_UP_MUTATION);

  const updateName = (e) => setName(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ variables: { name, email, password } });
    setName("");
    setEmail("");
    setPassword("");
  };

  const isSubmitDisabled = [name, email, password].includes("");

  return (
    <form>
      <fieldset>
        <h2>Sign Up</h2>
        <label htmlFor="name">
          Name
          <input type="text" name="name" value={name} onChange={updateName} />
        </label>
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
          Sign Up
        </button>
      </fieldset>
    </form>
  );
};

export default SignUp;
