import gql from "graphql-tag";
import { useState } from "react";
import useForm from "../lib/useForm";
import { useMutation } from "@apollo/react-hooks";
import { Node } from "./Table";

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

const TableRow: React.FC<Node> = ({ id, amount, category, comments, type }) => {
  let { inputs, handleChange } = useForm({ amount, category, comments });
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
      location.reload() // TODO refetch instead
  };
  return (
    <div style={{ display: "block", marginBottom: "10px" }}>
      <label htmlFor="amount">
        Amount
        <input
          type="number"
          name="amount"
          value={inputs.amount}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label htmlFor="category">
        Category
        <input
          type="text"
          name="category"
          value={inputs.category}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label htmlFor="comments">
        Comments
        <input
          type="text"
          name="comments"
          value={inputs.comments}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      {showEditOptions ? (
        <>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={enableUpdate}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TableRow;
