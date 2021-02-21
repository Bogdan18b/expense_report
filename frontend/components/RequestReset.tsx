import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

const RequestPasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [requestPasswordReset] = useMutation(REQUEST_RESET_MUTATION);

  const updateEmail = (e) => setEmail(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    requestPasswordReset({ variables: { email } });
    setEmail("");
  };

  const isSubmitDisabled = email === "";

  return (
    <form>
      <fieldset>
        <h2>Reset Password</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={updateEmail}
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Request Reset
        </button>
      </fieldset>
    </form>
  );
};

export default RequestPasswordReset;
