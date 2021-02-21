import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {useRouter} from "next/router";
import useForm from "../lib/useForm";

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
  const {inputs, handleChange, reset} = useForm()
  const {email, password} = inputs; // add option to see password
  const [signIn, {data, error}] = useMutation(SIGN_IN_MUTATION);
  const {push} = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ variables: { email, password } })
    if (data) {
      push('/report')
    }
    if (error) {
      // todo
    }
    reset();
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
