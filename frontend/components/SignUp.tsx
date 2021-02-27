import { useEffect, Dispatch, SetStateAction } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";
import {Button} from './TableRow';
import {Form} from './RequestReset';
import {Wrapper} from './SignIn';

type Props = {
  setIsNewUser?: Dispatch<SetStateAction<boolean>>;
}

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

const SignUp: React.FC<Props> = ({setIsNewUser}) => {
  const { inputs, handleChange, reset } = useForm();
  const { name, email, password } = inputs;
  const [signUp, { data, error }] = useMutation(SIGN_UP_MUTATION);
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      push("/report");
    }
    if (error) {
      //todo
    }
  }, [data, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ variables: { name, email, password } });
    reset();
  };

  const isSubmitDisabled = [name, email, password].includes("");

  return (
    <Wrapper>
    <Form>
      <fieldset>
        <h2>Sign Up</h2>
        <label htmlFor="name">
          Name
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
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
          Sign Up
        </Button>
      </fieldset>
    </Form>
    <h4>Have an account?</h4>
    <Button onClick={() => setIsNewUser(false)}>Sign In</Button>
    </Wrapper>
  );
};

export default SignUp;
