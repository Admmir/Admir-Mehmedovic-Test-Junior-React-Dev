import { Component, Fragment } from "react";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";

class CartItemButtons extends Component {
  render() {
    return (
      <div className={classes.buttonsAndQuantity}>
        <button
          value={
            this.props.product.prices.find(
              (price) => price.currency.label === this.props.currency
            ).amount
          }
          id={this.props.item.id}
          onClick={this.props.add}
          className={classes.addOrRemoveButton}
        >
          +
        </button>
        <span>{this.props.item.quantity}</span>
        <button
          value={
            this.props.product.prices.find(
              (price) => price.currency.label === this.props.currency
            ).amount
          }
          id={this.props.item.id}
          onClick={this.props.remove}
          className={classes.addOrRemoveButton}
        >
          -
        </button>
      </div>
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

export default connect(mapStateToProps)(CartItemButtons);
