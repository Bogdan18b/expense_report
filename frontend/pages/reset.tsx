import ResetPassword from "../components/ResetPassword";
import { useRouter } from "next/router";

const Reset: React.FC = () => {
  const { query } = useRouter();
  return (
    <>
      <h1>Reset your password</h1>
      <ResetPassword resetToken={query?.rt as String} />
    </>
  );
};

export default Reset;
