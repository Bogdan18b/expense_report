import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "./TableRow";
import styled from "styled-components";

export const Form = styled.form`
  fieldset {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--blue);
  }
  label, input {
    display: block;
    padding: 8px;
  }
  label {
  }
`;

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
    <Form>
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
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Request Reset
        </Button>
      </fieldset>
    </Form>
  );
};

export default RequestPasswordReset;
