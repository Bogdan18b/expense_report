import { useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Wrapper, Form } from "./Expense";
import useForm from "../lib/useForm";
import { UserContext } from "./User";
import Table from "./Table";
import {Button} from './TableRow';
import { getTotal } from "../lib/utils";

type Props = {
  setIncome: (total: number) => number;
};

const CREATE_INCOME_MUTATION = gql`
  mutation CREATE_INCOME_MUTATION(
    $amount: Float!
    $category: String!
    $comments: String
    $userId: String!
  ) {
    createIncome(
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

const GET_INCOMES = gql`
  query getIncomes($userId: String!) {
    incomes(userId: $userId) {
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

const Income: React.FC<Props> = ({ setIncome }) => {
  const { inputs, handleChange, reset } = useForm();
  const { id: userId } = useContext(UserContext);
  const { amount, category, comments } = inputs;
  const [createIncome] = useMutation(CREATE_INCOME_MUTATION);
  const { data, loading, error, refetch } = useQuery(GET_INCOMES, {
    variables: { userId },
  });

  const incomes = data?.incomes?.edges;
  useEffect(() => {
    if (incomes) {
      const totalIncome = getTotal(incomes);
      setIncome(totalIncome);
    }
  }, [incomes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createIncome({ variables: { amount, category, comments, userId } });

    if (error) {
      //todo
    }
    reset();
    refetch();
  };

  const isSubmitDisabled = [amount, category].includes("");

  return (
    <Wrapper>
      <h4>Add Income</h4>
      <Form>
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
        <Button
          type="submit"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Add income
        </Button>
      </Form>
      <h4>All Income</h4>
      <Table edges={incomes} type="income" refetch={refetch} />
    </Wrapper>
  );
};

export default Income;
