import {useState} from 'react'
import Header from "../components/Header";
import User from "../components/User";
import Expense from "../components/Expense";
import Income from "../components/Income";
import Total from "../components/Total";

const Report: React.FC = () => {
  const [expenses, setExpenses] = useState(0)
  const [income, setIncome] = useState(0)
  return (
    <User>
      <Total expenses={expenses} income={income}/>
      <Header />
      <Income setIncome={setIncome}/>
      <Expense setExpenses={setExpenses}/>
    </User>
  );
};

export default Report;
