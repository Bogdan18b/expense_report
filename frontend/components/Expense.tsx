import { useContext } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";
import { UserContext } from "./User";
import Table from "./Table";

const CREATE_EXPENSE_MUTATION = gql`
  mutation CREATE_EXPENSE_MUTATION(
    $amount: Float!
    $category: String!
    $comments: String
    $userId: String!
  ) {
    createExpense(
      amount: $amount
      category: $category
      comments: $comments
      userId: $userId
    ) {
      id
      amount
      category
      comments
      userId
    }
  }
`;
// TODO create fragments
const GET_EXPENSES = gql` 
  query getExpenses($userId: String!) {
    expenses(userId: $userId) {
      edges {
        node {
          id
          amount
          category
          comments
        }
      }
    }
  }
`;

const Expense: React.FC = () => {
  const { inputs, handleChange, reset } = useForm();
  const { amount, category, comments } = inputs;
  const { id: userId } = useContext(UserContext);
  const [createExpense] = useMutation(CREATE_EXPENSE_MUTATION);
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES, {
    variables: { userId },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense({ variables: { amount, category, comments, userId } });

    if (error) {
      //todo
    }
    reset();
    refetch();
  };

  const isSubmitDisabled = [amount, category].includes("");

  return (
    <>
      <form>
        <fieldset>
          <h2>Add expense</h2>
          <label htmlFor="amount">
            Amount
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category">
            Category
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="comments">
            Comments
            <input
              type="text"
              name="comments"
              value={comments}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            Add expense
          </button>
        </fieldset>
      </form>
      <Table edges={data?.expenses?.edges} />
    </>
  );
};

export default Expense;
