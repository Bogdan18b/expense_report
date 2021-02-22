import { Fragment } from "react";
import TableRow from "./TableRow";

export type IncomeOrExpense = "income" | "expense";

export type Node = {
  id: string;
  amount: number;
  category: string;
  comments?: string;
  type?: IncomeOrExpense;
  refetch?: () => any;
};

type Props = {
  edges: { node: Node }[];
  type: IncomeOrExpense;
  refetch: () => any;
};

const Table: React.FC<Props> = ({ edges = [], type, refetch }) => (
  <ul>
    {edges.map(({ node }) => (
      <TableRow key={node.id} {...node} type={type} refetch={refetch} />
    ))}
  </ul>
);

export default Table;
