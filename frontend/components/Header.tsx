import { useContext } from "react";
import SignOut from "./SignOut";
import { UserContext } from "./User";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  section {
    display: flex;
    align-items: center
    p {
      margin-right: 10px;
    }
  }
`;

const Header: React.FC = () => {
  const { name } = useContext(UserContext);
  return (
    <Wrapper>
      <h1>Expense report</h1>
      <section>
        <p>Hello {name}</p>
        {name && <SignOut />}
      </section>
    </Wrapper>
  );
};

export default Header;
