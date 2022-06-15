import { Component, Fragment } from "react";
import classes from "./CartItem.module.css";
import { connect } from "react-redux";

class CartItemNameAndBrand extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.nameAndBrand}>
          <div>
            <p>{this.props.data.brand}</p>
            <p> {this.props.data.name}</p>
          </div>
        </div>
        <div className={classes.priceDiv}>
          <b className={classes.price}>
            {this.props.symbol}
            {
              this.props.data.prices.find(
                (price) => price.currency.label === this.props.currency
              ).amount
            }
          </b>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currencyReducer.currencySelected,
    symbol: state.currencyReducer.currencySymbol,
  };
};

export default connect(mapStateToProps)(CartItemNameAndBrand);
