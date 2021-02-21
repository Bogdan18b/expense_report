import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, password: $password) {
      id
      name
      email
    }
  }
`;

interface Props {
  resetToken: String
}

const ResetPassword: React.FC<Props> = ({resetToken}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requestPasswordReset] = useMutation(RESET_PASSWORD_MUTATION);

  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      requestPasswordReset({ variables: { password, resetToken } }); //refetch?
    } else {
      // error message
    }
    setPassword("");
    setConfirmPassword("");
  };

  const isSubmitDisabled = [password, confirmPassword].includes("");

  return (
    <form>
      <fieldset>
        <h2>Reset Password</h2>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={updatePassword}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="password"
            value={confirmPassword}
            onChange={updateConfirmPassword}
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Reset password
        </button>
      </fieldset>
    </form>
  );
};

export default ResetPassword;
