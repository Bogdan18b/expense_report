import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  :root {
   font-size: 16px;
   --blue: blue;
  } 
`;

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Expense Report</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
