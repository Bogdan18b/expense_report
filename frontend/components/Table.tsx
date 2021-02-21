import { Fragment } from "react";

type Props = {
  edges: {
    node: {
      id: string;
      amount: number;
      category: string;
      comments?: string;
    };
  }[];
};


const Table: React.FC<Props> = ({ edges = [] }) => (
  <ul>
    {edges.map(({ node }) => (
      <Fragment key={node.id}>
        <li>{node.amount}</li>
        <li>{node.category}</li>
        {node.comments && <li>{node.comments}</li>}
      </Fragment>
    ))}
  </ul>
);

export default Table;
