import gql from "graphql-tag";
import { useState } from "react";
import useForm from "../lib/useForm";
import { useMutation } from "@apollo/react-hooks";
import { Node } from "./Table";
import styled from "styled-components";

export const Button = styled.button`
  background-color: blue;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 4px;
  margin: 2px;
  width: 100px;
`;

const UPDATE_INCOME_MUTATION = gql`
  mutation UPDATE_INCOME_MUTATION(
    $amount: Float!
    $category: String!
    $comments: String
    $id: String!
  ) {
    updateIncome(
      amount: $amount
      category: $category
      comments: $comments
      id: $id
    ) {
      id
      amount
      category
      comments
    }
  }
`;

const UPDATE_EXPENSE_MUTATION = gql`
  mutation UPDATE_EXPENSE_MUTATION(
    $amount: Float!
    $category: String!
    $comments: String
    $id: String!
  ) {
    updateExpense(
      amount: $amount
      category: $category
      comments: $comments
      id: $id
    ) {
      id
      amount
      category
      comments
    }
  }
`;

const DELETE_EXPENSE_MUTATION = gql`
  mutation DELETE_EXPENSE_MUTATION($id: String!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

const DELETE_INCOME_MUTATION = gql`
  mutation DELETE_INCOME_MUTATION($id: String!) {
    deleteIncome(id: $id) {
      id
    }
  }
`;

const TableRow: React.FC<Node> = ({
  id,
  amount,
  category,
  comments,
  createdAt,
  type,
  refetch,
}) => {
  let { inputs, handleChange } = useForm({
    amount,
    category,
    comments,
    createdAt,
  });
  const [disabled, setDisabled] = useState(true);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [updateExpense] = useMutation(UPDATE_EXPENSE_MUTATION);
  const [updateIncome] = useMutation(UPDATE_INCOME_MUTATION);
  const [deleteExpense] = useMutation(DELETE_EXPENSE_MUTATION);
  const [deleteIncome] = useMutation(DELETE_INCOME_MUTATION);
  const enableUpdate = () => {
    setDisabled(false);
    setShowEditOptions(true);
  };

  // TODO implement undo changes
  const handleCancel = () => {
    setDisabled(true);
    setShowEditOptions(false);
  };

  const handleUpdate = () => {
    type == "income"
      ? updateIncome({ variables: { id, ...inputs } })
      : updateExpense({ variables: { id, ...inputs } });
    setDisabled(true);
    setShowEditOptions(false);
  };

  const handleDelete = () => {
    type == "income"
      ? deleteIncome({ variables: { id, ...inputs } })
      : deleteExpense({ variables: { id, ...inputs } });
    refetch();
  };
  return (
    <tr>
      <td>

      <input
        type="number"
        name="amount"
        value={inputs.amount}
        onChange={handleChange}
        disabled={disabled}
        />
        </td>
        <td>
      <input
        type="text"
        name="category"
        value={inputs.category}
        onChange={handleChange}
        disabled={disabled}
        />
        </td>
        <td>
      <input
      type="text"
      name="comments"
      value={inputs.comments}
      onChange={handleChange}
      disabled={disabled}
      />
      </td>
      <td>
      <input
        type="text"
        name="created at"
        value={inputs.createdAt.slice(0, 10)}
        onChange={handleChange}
        disabled
        />
        </td>
      <td>
        {showEditOptions ? (
          <>
            <Button type="button" onClick={handleUpdate}>
              Update
            </Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={enableUpdate}>
              Edit
            </Button>
            <Button type="button" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
