import { useContext } from "react";
import SignOut from "./SignOut";
import { UserContext } from "./User";

const Header = () => {
  const { name } = useContext(UserContext);
  return (
    <>
      <h1>Hello {name}</h1>
      {name && <SignOut />}
    </>
  );
};

export default Header;
