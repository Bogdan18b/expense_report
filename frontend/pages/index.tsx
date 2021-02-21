import styled from "styled-components";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import RequestReset from "../components/RequestReset";

const Home: React.FC = () => {
  return (
    <>
      <SignUp />
      <SignIn />
      <RequestReset />
    </>
  );
};

export default Home;
