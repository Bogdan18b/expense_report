import { Fragment } from "react";
import TableRow from "./TableRow";

export type IncomeOrExpense = "income" | "expense";

export type Node = {
  id: string;
  amount: number;
  category: string;
  comments?: string;
  type?: IncomeOrExpense;
};

type Props = {
  edges: { node: Node }[];
  type: IncomeOrExpense;
};

const Table: React.FC<Props> = ({ edges = [], type }) => (
  <ul>
    {edges.map(({ node }) => (
      <TableRow key={node.id} {...node} type={type} />
    ))}
  </ul>
);

export default Table;
