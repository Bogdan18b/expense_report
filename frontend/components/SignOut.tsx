import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import {Button} from './TableRow';

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
  return <Button onClick={handleClick}>Sign Out</Button>;
};

export default SignOut;
