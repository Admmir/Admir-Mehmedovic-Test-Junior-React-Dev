import { Component } from "react";
import classes from "./BagItem.module.css";
import { connect } from "react-redux";

class BagItemPrice extends Component {
  render() {
    return (
      <div className={classes.priceDiv}>
        <b className={classes.price}>
          {this.props.symbol}
          {
            this.props.prices.find(
              (price) => price.currency.label === this.props.currency
            ).amount
          }
        </b>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
  };
};

export default connect(mapStateToProps)(BagItemPrice);
