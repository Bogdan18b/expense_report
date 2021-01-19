import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import User from "../components/User";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo } from "../lib/apolloClient";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log({ apolloClient });
  return (
    <ApolloProvider client={apolloClient}>
      <User>
        <Header/>
        <Meta />
        <Component {...pageProps} />
      </User>
    </ApolloProvider>
  );
};

export default App;
