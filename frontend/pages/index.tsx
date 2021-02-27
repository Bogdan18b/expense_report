import { useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import styled from "styled-components";

const Home: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  return (
    <>
      {isNewUser ? (
        <SignUp setIsNewUser={setIsNewUser} />
      ) : (
        <SignIn setIsNewUser={setIsNewUser} />
      )}
    </>
  );
};

export default Home;
