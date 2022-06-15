import { Component } from "react";
import classes from "./ProductsPage&Card.module.css";
import ProductCard from "./ProductCard";
import { gql } from "@apollo/client";
import { Query } from "@apollo/react-components";
import { connect } from "react-redux";
import { withParams } from "../HOC/HOC.js";

class ProductsPage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.gridLayout}>
          <h1 className={classes.categoryText}>{this.props.category}</h1>
          <Query
            query={gql`
              query {
                category(input: { title: "${
                  this.props.params.category !== undefined
                    ? this.props.params.category
                    : this.props.category.toLowerCase()
                }" }) {
                  products {
                    name
                    id
                    inStock
                    gallery
                    brand
                    prices {
                      currency {
                        label
                      }
                      amount
                    }
                  }
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return data.category.products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    render={this.props.reload}
                  />
                );
              });
            }}
          </Query>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.categoryReducer.categorySelected,
  };
};

export default connect(mapStateToProps)(withParams(ProductsPage));
