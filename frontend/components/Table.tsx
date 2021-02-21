import { Fragment } from "react";

type Data = {
  id: string;
  amount: number;
  category: string;
  comments?: string;
};

type Props = {
  data: Data[];
};
const Table: React.FC<Props> = ({ data = [] }) => (
  <ul>
    {data.map(({ id, amount, category, comments }) => (
      <Fragment key={id}>
        <li>{amount}</li>
        <li>{category}</li>
        {comments && <li>{comments}</li>}
      </Fragment>
    ))}
  </ul>
);

export default Table;
