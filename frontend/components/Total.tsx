type Props = {
  expenses: number;
  income: number;
};

const Total: React.FC<Props> = ({ income, expenses }) => {
  return (
    <>
      <h1>Total: ${income - expenses}</h1>
      <h2>Income: ${income}</h2>
      <h2>Expenses: ${expenses}</h2>
    </>
  );
};

export default Total;
