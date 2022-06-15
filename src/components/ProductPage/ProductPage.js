import { Component, Fragment } from "react";
import classes from "./ProductPage.module.css";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import JsxParser from "react-jsx-parser";
import { connect } from "react-redux";
import { cartActions } from "../../store&slices/cartItemsSlice";
import { withParams } from "../HOC/HOC.js";
import ProductImages from "./ProductImages";
import ProductPageAttributes from "./ProductPageAttributes";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
      noSelectedAttributes: false,
      addedToCart: false,
    };
  }
  //Selects displayed image

  selectedAttributeHandler(event) {
    this.setState({
      selectedAttributes: [
        ...this.state.selectedAttributes.filter(
          (attribute) => attribute.name !== event.target.id
        ),
        { name: event.target.id, value: event.target.outerText },
      ].sort((a, b) => {
        let attributeA = a.name.toUpperCase();
        let attributeB = b.name.toUpperCase();
        if (attributeA < attributeB) {
          return -1;
        }
        if (attributeA > attributeB) {
          return 1;
        }
        return 0;
      }),
    });
    this.setState({ addedToCart: false });
  }
  //selects attribute
  addToCartHandler(event) {
    this.setState({ addedToCart: true });
    this.setState({ noSelectedAttributes: false });
    this.props.addItemToCart({
      attributes: this.state.selectedAttributes,
      id: event.target.id,
      price: event.target.value,
    });
    if (this.props.close !== undefined) {
      this.props.close(event);
    }
  }
  noSelectedAttributes() {
    this.setState({ noSelectedAttributes: true });
  }
  render() {
    return (
      <Fragment>
        <Query
          query={gql`
          query {
            product(id: "${
              this.props.params.productID === undefined
                ? this.props.productSelected
                : this.props.params.productID
            }") {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                name
                type
                items {
                  displayValue
                  id
                  value
                }
                id
              }
              prices {
                amount
                currency {
                  label
                  symbol
                }
              }
              brand
            }
          }
        `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <div className={classes.pageLayout}>
                <ProductImages data={data} />
                <div className={classes.description}>
                  <h2>{data.product.brand}</h2>
                  <h3>{data.product.name}</h3>
                  <ProductPageAttributes
                    key={data.product.id}
                    data={data}
                    selectAttribute={this.selectedAttributeHandler.bind(this)}
                    selectedAttributes={this.state.selectedAttributes}
                  />

                  <b>PRICE:</b>
                  <b className={classes.price}>
                    {this.props.symbol}
                    {
                      data.product.prices.find(
                        (price) => price.currency.label === this.props.currency
                      ).amount
                      //find returns one element-object thats why .amount at the end return price amount
                    }
                  </b>
                  {this.state.noSelectedAttributes && (
                    <p className={classes.danger}>Please select attributes</p>
                  )}
                  {this.state.addedToCart && (
                    <p className={classes.success}>Added to cart</p>
                    //this part handles two cases of submition
                  )}

                  <button
                    value={
                      data.product.prices.find(
                        (price) => price.currency.label === this.props.currency
                      ).amount
                    }
                    id={data.product.id}
                    onClick={
                      data.product.attributes.length ===
                      this.state.selectedAttributes.length
                        ? this.addToCartHandler.bind(this)
                        : this.noSelectedAttributes.bind(this)
                    }
                    disabled={!data.product.inStock && true}
                    className={
                      !data.product.inStock
                        ? classes.disabledBtn
                        : classes.addToCartBtn
                    }
                  >
                    ADD TO CART
                  </button>
                  <div>
                    <JsxParser jsx={data.product.description} />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
    productSelected: state.cardReducer.productSelected,
    cart: state.cartItemsReducer.itemsSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (payload) => dispatch(cartActions.addItemToCart(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(ProductPage));
