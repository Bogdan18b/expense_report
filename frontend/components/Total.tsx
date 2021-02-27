import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2, h3 {
    padding: 4px;
    margin: 4px;
    border-bottom: 1px solid black;
  }
`;

type Props = {
  expenses: number;
  income: number;
};

const Total: React.FC<Props> = ({ income, expenses }) => {
  return (
    <Wrapper>
      <h2>Total: ${income - expenses}</h2>
      <h3>Income: ${income}</h3>
      <h3>Expenses: ${expenses}</h3>
    </Wrapper>
  );
};

export default Total;
