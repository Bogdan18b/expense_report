import Header from "../components/Header";
import User from "../components/User";
import Expense from "../components/Expense";
import Income from "../components/Income";

const Report: React.FC = () => {
  return (
    <User>
      <Header />
      <Income />
      <Expense />
    </User>
  );
};

export default Report;
