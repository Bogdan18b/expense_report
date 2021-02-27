import TableRow from "./TableRow";
import styled from "styled-components";

const Wrapper = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  td,
  th,
  tr {
    border: 1px solid black;
    text-align: center;
  }
  input {
    border: none;
    text-align: center;
  }
  input:disabled {
    background-color: white;
  }
`;
export type IncomeOrExpense = "income" | "expense";

export type Node = {
  id: string;
  amount: number;
  category: string;
  comments?: string;
  type?: IncomeOrExpense;
  createdAt?: string;
  refetch?: () => any;
};

type Props = {
  edges: { node: Node }[];
  type: IncomeOrExpense;
  refetch: () => any;
};

const Table: React.FC<Props> = ({ edges = [], type, refetch }) => (
  <Wrapper>
    <thead>
      <tr>
        <th>Amount</th>
        <th>Category</th>
        <th>Description</th>
        <th>Date</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      {edges.map(({ node }) => (
        <TableRow key={node.id} {...node} type={type} refetch={refetch} />
      ))}
    </tbody>
  </Wrapper>
);

export default Table;
