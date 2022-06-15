import { Component } from "react";
import classes from "./BagItem.module.css";
import { connect } from "react-redux";

class BagItemButtonsQuantity extends Component {
  add() {
    this.props.add();
  }
  remove() {
    this.props.remove();
  }
  render() {
    return (
      <div className={classes.buttonsAndQuantity}>
        <button
          value={
            this.props.prices.find(
              (price) => price.currency.label === this.props.currency
            ).amount
          }
          id={this.props.item.id}
          onClick={this.props.add.bind(this)}
          className={classes.addOrRemoveButton}
        >
          +
        </button>
        <span>{this.props.item.quantity}</span>
        <button
          value={
            this.props.prices.find(
              (price) => price.currency.label === this.props.currency
            ).amount
          }
          id={this.props.item.id}
          onClick={this.props.remove.bind(this)}
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

export default connect(mapStateToProps)(BagItemButtonsQuantity);
