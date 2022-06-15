import { Component } from "react";
import classes from "./CartItem.module.css";
import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";
import { connect } from "react-redux";
import { cartActions } from "../../store&slices/cartItemsSlice";
import CartItemNameAndBrand from "./CartItemNameAndBrand";
import CartItemAttributes from "./CartItemAttributes";
import CartItemButtons from "./CartItemButtons";

class CartItem extends Component {
  constructor(props) {
    super();
  }
  addQuantityHandler(event) {
    this.props.addQuantity({
      id: event.target.id,
      item: this.props.item,
      value: event.target.value,
    });
  }

  removeQuantityHandler(event) {
    this.props.removeQuantity({
      id: event.target.id,
      item: this.props.item,
      value: event.target.value,
    });
  }

  render() {
    return (
      <Query
        query={gql`
      query {
        product(id: "${this.props.item.id}") {
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
            <div className={classes.itemContainer}>
              <div className={classes.description}>
                <div>
                  <CartItemNameAndBrand data={data.product} />
                  <CartItemAttributes
                    attributes={data.product.attributes}
                    item={this.props.item}
                    key={data.product.id}
                  />
                </div>
              </div>
              <CartItemButtons
                product={data.product}
                item={this.props.item}
                remove={this.removeQuantityHandler.bind(this)}
                add={this.addQuantityHandler.bind(this)}
              />
              <img
                className={classes.displayedImg}
                src={data.product.gallery[0]}
                alt="displayed"
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
    cart: state.cartItemsReducer.itemsSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (payload) => dispatch(cartActions.addItemToCart(payload)),
    addTotals: () => dispatch(cartActions.addTotals()),
    addQuantity: (payload) => dispatch(cartActions.addQuantity(payload)),
    removeQuantity: (payload) => dispatch(cartActions.removeQuantity(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
