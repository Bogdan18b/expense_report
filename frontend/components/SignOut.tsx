import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
const SIGN_OUT_MUTATION = gql`
  mutation {
    signOut {
      message
    }
  }
`;

const SignOut: React.FC = () => {
  const [signOut] = useMutation(SIGN_OUT_MUTATION);
  const handleClick = () => {
    signOut();
    push("/");
  };
  const { push } = useRouter();
  return <button onClick={handleClick}>Sign Out</button>;
};

export default SignOut;
