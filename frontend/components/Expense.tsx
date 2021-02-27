import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import useForm from "../lib/useForm";
import { UserContext } from "./User";
import Table from "./Table";
import { getTotal } from "../lib/utils";
import {Button} from './TableRow';

interface Props {
  setExpenses: Dispatch<SetStateAction<number>>;
}

export const Wrapper = styled.section`
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  input {
    width: 100px;
    margin: 0 8px;
  }
`;

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
          createdAt
        }
      }
    }
  }
`;

const Expense: React.FC<Props> = ({ setExpenses }) => {
  const { inputs, handleChange, reset } = useForm();
  const { amount, category, comments } = inputs;
  const { id: userId } = useContext(UserContext);
  const [createExpense] = useMutation(CREATE_EXPENSE_MUTATION);
  const { data, loading, error, refetch } = useQuery(GET_EXPENSES, {
    variables: { userId },
  });
  const expenses = data?.expenses?.edges;
  useEffect(() => {
    if (expenses) {
      const totalExpenses = getTotal(expenses);
      setExpenses(totalExpenses);
    }
  }, [expenses]);

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
    <Wrapper>
      <h4>Add Expense</h4>
      <Form>
        <label htmlFor="amount">
          Amount:
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="category">
          Category:
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="comments">
          Comments:
          <input
            type="text"
            name="comments"
            value={comments}
            onChange={handleChange}
          />
        </label>
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Add expense
        </Button>
      </Form>
      <h4>All Expenses</h4>
      <Table edges={expenses} refetch={refetch} type="expense" />
    </Wrapper>
  );
};

export default Expense;
