import { useState } from "react";
import Header from "../components/Header";
import User from "../components/User";
import Expense from "../components/Expense";
import Income from "../components/Income";
import Total from "../components/Total";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;
const Report: React.FC = () => {
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);
  return (
    <User>
      <Header />
      <Total expenses={expenses} income={income} />
      <Grid>
        <Income setIncome={setIncome} />
        <Expense setExpenses={setExpenses} />
      </Grid>
    </User>
  );
};

export default Report;
