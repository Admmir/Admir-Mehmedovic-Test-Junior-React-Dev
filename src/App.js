import { Routes } from "react-router-dom";
import { Route } from "react-router";
import { Component, Fragment } from "react";
import Header from "./components/Header/Header";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import ProductsPage from "./components/ProductsListPage/ProductsPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Bag from "./components/BagPage/Bag";

const link = new HttpLink({
  uri: "https://graphqlstore.herokuapp.com/",
});
//https://graphqlstore.herokuapp.com/
//http://localhost:4000
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});
//Apollo has inMemoryCache which basicly stores fetched data localy and my problem is that there are attributes ids which are same
//for example when I fetch sizes of jacket or shoes it renders the same attributes from local storage, and bugs
//That's why I disabled cache

class App extends Component {
  render() {
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <Header />
          <Routes>
            <Route exact path="/bag" element={<Bag />}></Route>
            <Route exact path="/" element={<ProductsPage />}></Route>
            <Route exact path="/:category" element={<ProductsPage />}></Route>
            <Route
              exact
              path="/product/:productID"
              element={<ProductPage />}
            ></Route>
          </Routes>
        </ApolloProvider>
      </Fragment>
    );
  }
}

export default App;
