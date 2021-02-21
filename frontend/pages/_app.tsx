import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  :root {
   font-size: 16px;
   --red: red;
  } 
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <h1>Expense report</h1>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
