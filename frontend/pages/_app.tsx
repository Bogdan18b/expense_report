import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
console.log({apolloClient})
  return (
    <ApolloProvider client={apolloClient}>
      <Meta />
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
