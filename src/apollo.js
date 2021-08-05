import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri : "http://localhost:4000"/* movie api server url */
});

export default client;