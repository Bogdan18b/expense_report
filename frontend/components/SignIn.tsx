import { useEffect, Dispatch, SetStateAction, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";
import RequestReset from "../components/RequestReset";
import { Button } from "./TableRow";
import { Form } from "./RequestReset";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
interface Props {
  setIsNewUser?: Dispatch<SetStateAction<boolean>>;
}

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SignIn: React.FC<Props> = ({ setIsNewUser }) => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { inputs, handleChange, reset } = useForm();
  const { email, password } = inputs; // add option to see password
  const [signIn, { data, error }] = useMutation(SIGN_IN_MUTATION);
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      push("/report");
    }
    if (error) {
      // todo
    }
  }, [data, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ variables: { email, password } });
    reset();
  };

  const handleReset = () => setShowResetPassword(true)

  const isSubmitDisabled = [email, password].includes("");

  return (
    <Wrapper>
      {showResetPassword ? (
        <RequestReset />
      ) : (
        <>
          <Form>
            <fieldset>
              <h2>Sign In</h2>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Button
                type="button"
                onClick={handleReset}
              >
                Forgot Password
              </Button>
            </fieldset>
          </Form>
          <h4>Don't have an account?</h4>
          <Button
            onClick={() => {
              setIsNewUser(true);
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default SignIn;
