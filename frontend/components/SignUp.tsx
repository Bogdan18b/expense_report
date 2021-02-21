import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";

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
  const { inputs, handleChange, reset } = useForm();
  const { name, email, password } = inputs;
  const [signUp, { data, error }] = useMutation(SIGN_UP_MUTATION);
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp({ variables: { name, email, password } });
    debugger;
    if (data) {
      push("/report");
    }
    if (error) {
      //todo
    }
    reset();
  };

  const isSubmitDisabled = [name, email, password].includes("");

  return (
    <form>
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
